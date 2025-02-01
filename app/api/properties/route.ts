import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/mockData';

export const dynamic = 'force-static';

export async function GET() {
  try {
    // Map all properties to the correct format
    const properties = mockProperties.map(property => ({
      id: property.id.toString(),
      title: property.title,
      description: property.description,
      price: property.price,
      address: property.location.split(',')[0],
      city: property.location.split(',')[0],
      state: 'HI',
      zipCode: '96740',
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareFeet: property.squareFootage,
      propertyType: property.propertyType,
      yearBuilt: property.yearBuilt,
      images: property.images,
      features: [],
      status: 'For Sale',
      island: property.location.includes('Kailua') ? 'Oahu' : 
              property.location.includes('Maui') ? 'Maui' :
              property.location.includes('Kona') ? 'Big Island' :
              property.location.includes('Lihue') ? 'Kauai' : 'Oahu'
    }));

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error in properties API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}