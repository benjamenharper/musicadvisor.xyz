import axios, { AxiosError } from 'axios';

// Zillow API integration using RapidAPI
// API Key and Host should ideally be stored in environment variables for security
const API_KEY = '72b25b9609mshf22de8083b9ef4bp18d5b9jsn2b059ddfdc06';
const API_HOST = 'zillow-com1.p.rapidapi.com';

// Simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch the property floor plan from Zillow using the property URL
 * @param {string} propertyUrl - The URL of the property on Zillow
 * @returns {Promise<any>} - The floor plan data
 */
export async function getPropertyFloorPlan(propertyUrl: string): Promise<any> {
  const cacheKey = `floorplan-${propertyUrl}`;
  
  // Check cache first
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const options = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/propertyFloorPlan',
    params: { property_url: propertyUrl },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    
    // Cache the successful response
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now()
    };
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch floor plan:', error);
    throw error;
  }
}

// New function to perform an extended property search via Zillow API
export async function getExtendedSearchResults(location: string, statusType: string, homeType: string): Promise<any> {
  const cacheKey = `${location}-${statusType}-${homeType}`;
  
  // Check cache first
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached results for:', location);
    return cached.data;
  }

  const options = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
    params: {
      location,
      status_type: statusType,
      home_type: homeType,
      page: "1"
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    console.log('Fetching properties for location:', location);
    const response = await axios.request(options);
    
    // Cache the successful response
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now()
    };
    
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      console.error('Rate limit exceeded for Zillow API. Please try again later.');
      return { results: [] }; // Return empty results on rate limit
    }
    console.error('Zillow API Error:', {
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      message: axiosError.message
    });
    throw error;
  }
}
