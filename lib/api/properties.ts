import axios from 'axios';
import { Property } from '@/types/property';

const RAPIDAPI_KEY = '72b25b9609mshf22de8083b9ef4bp18d5b9jsn2b059ddfdc06';
const RAPIDAPI_HOST = 'redfin-com-data.p.rapidapi.com';

// Redfin region IDs
const REGION_IDS = {
  OAHU: '6_2446',
  MAUI: '6_2447',
  KAUAI: '6_2448',
  HAWAII: '6_2449', // Big Island
};

// Mock properties for development
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Ocean View Villa',
    description: 'Beautiful ocean view villa with modern amenities and stunning views of the Pacific. This exclusive property features an infinity pool, gourmet kitchen, and spacious lanai.',
    price: 4250000,
    address: '123 Beach Road',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96815',
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 2724,
    propertyType: 'Single Family',
    yearBuilt: 2010,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&auto=format&fit=crop&q=60'
    ],
    features: ['Ocean Views', 'Infinity Pool', 'Gourmet Kitchen', 'Private Beach Access'],
    status: 'For Sale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Modern Downtown Condo',
    description: 'Luxurious high-floor condo with panoramic city and ocean views. Features high-end finishes, floor-to-ceiling windows, and world-class amenities.',
    price: 1750000,
    address: '456 City Avenue',
    city: 'Honolulu',
    state: 'HI',
    zipCode: '96813',
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1200,
    propertyType: 'Condo',
    yearBuilt: 2015,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1617104678098-de229db51175?w=800&auto=format&fit=crop&q=60'
    ],
    features: ['Ocean Views', 'Modern Appliances', 'Parking', '24/7 Security'],
    status: 'For Sale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Beachfront Paradise Estate',
    description: 'Rare beachfront estate offering the ultimate Hawaiian lifestyle. Features a private pool, expansive outdoor living spaces, and direct beach access.',
    price: 8950000,
    address: '789 Oceanfront Drive',
    city: 'Kailua',
    state: 'HI',
    zipCode: '96734',
    bedrooms: 5,
    bathrooms: 4.5,
    squareFeet: 4500,
    propertyType: 'Estate',
    yearBuilt: 2018,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1613553497126-a44624272024?w=800&auto=format&fit=crop&q=60'
    ],
    features: ['Beachfront', 'Private Pool', 'Guest House', 'Outdoor Kitchen'],
    status: 'For Sale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

interface RedfinProperty {
  propertyId: string;
  mlsId: string;
  price: number;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zipcode: string;
  };
  description: string;
  propertyType: string;
  beds: number;
  baths: number;
  sqFt: number;
  yearBuilt: number;
  amenities: string[];
  status: string;
  photos: string[];
}

interface SearchPropertiesResponse {
  status: string;
  data: RedfinProperty[];
}

const apiOptions = {
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': RAPIDAPI_HOST,
  },
};

export async function searchProperties(
  island: string = 'oahu',
  status: string = 'sale',
): Promise<Property[]> {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return MOCK_PROPERTIES;
  }

  try {
    const regionId = REGION_IDS[island.toUpperCase()];
    if (!regionId) {
      throw new Error('Invalid island specified');
    }

    const response = await axios.get('https://redfin-com-data.p.rapidapi.com/properties/list', {
      params: {
        region_id: regionId,
        status: status,
        offset: '0',
        limit: '42',
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    return response.data.data.homes.map((home: any) => ({
      id: home.id.toString(),
      title: home.description.title,
      description: home.description.text,
      price: home.price.value,
      address: home.location.address.line,
      city: home.location.address.city,
      state: home.location.address.state,
      zipCode: home.location.address.postalCode,
      bedrooms: home.details.beds,
      bathrooms: home.details.baths,
      squareFeet: home.details.sqft,
      propertyType: home.propertyType,
      yearBuilt: home.details.yearBuilt,
      images: home.photos.map((photo: any) => photo.url),
      features: home.details.features,
      status: home.status,
      createdAt: home.listed,
      updatedAt: home.updated,
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Return mock data as fallback
    return MOCK_PROPERTIES;
  }
}

export async function getProperty(propertyId: string): Promise<Property | null> {
  // In development, return mock property
  if (process.env.NODE_ENV === 'development') {
    const mockProperty = MOCK_PROPERTIES.find(p => p.id === propertyId);
    return mockProperty || null;
  }

  try {
    const response = await axios.request({
      ...apiOptions,
      method: 'GET',
      url: `https://${RAPIDAPI_HOST}/properties/detail`,
      params: {
        propertyId,
      },
    });

    if (response.data.status === 'success' && response.data.data) {
      return transformRedfinProperty(response.data.data);
    }

    throw new Error('Property not found');
  } catch (error) {
    console.error('Error fetching property:', error);
    // Fallback to mock data in case of API error
    const mockProperty = MOCK_PROPERTIES.find(p => p.id === propertyId);
    return mockProperty || null;
  }
}

function transformRedfinProperty(apiProperty: RedfinProperty): Property {
  return {
    id: apiProperty.propertyId,
    title: `${apiProperty.propertyType} in ${apiProperty.address.city}`,
    description: apiProperty.description || '',
    price: apiProperty.price,
    address: apiProperty.address.streetAddress,
    city: apiProperty.address.city,
    state: apiProperty.address.state,
    zipCode: apiProperty.address.zipcode,
    bedrooms: apiProperty.beds,
    bathrooms: apiProperty.baths,
    squareFeet: apiProperty.sqFt,
    propertyType: apiProperty.propertyType,
    yearBuilt: apiProperty.yearBuilt || 0,
    images: apiProperty.photos || [],
    features: apiProperty.amenities || [],
    status: apiProperty.status || 'For Sale',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
