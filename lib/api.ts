import axios from 'axios';
import { mockProperties } from './mockData';

const api = axios.create({
  baseURL: 'https://redfin-com-data.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'redfin-com-data.p.rapidapi.com',
  },
});

// Add response interceptor for handling rate limits
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is rate limit (429) and we haven't retried yet
    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Wait for 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retry the request
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export const fetchProperties = async (params: {
  region_id: string;
  status: string;
  offset: string;
  limit: string;
}) => {
  // Return mock data instead of making API call
  return mockProperties;
};

export default {
  fetchProperties
};
