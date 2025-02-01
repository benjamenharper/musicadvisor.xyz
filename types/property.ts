export interface Property {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  location: string;
  city: string;
  island: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType?: string;
  zillowUrl?: string;
  numericPrice: number;
}
