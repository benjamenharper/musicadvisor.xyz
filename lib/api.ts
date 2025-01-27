import { mockProperties } from './mockData';

export const fetchProperties = async () => {
  // Return mock data instead of making API call
  return mockProperties;
};

export default {
  fetchProperties
};
