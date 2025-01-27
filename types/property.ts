export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Land';
  yearBuilt: number;
  images: string[];
  features: string[];
  status: 'For Sale' | 'Pending' | 'Sold';
  createdAt: string;
  updatedAt: string;
}
