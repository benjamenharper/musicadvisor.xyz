import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/mockData';
import { Property } from '@/types/property';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Convert the string ID to a number for comparison with mock data
    const numericId = Number(params.id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    // Find the property in mock data
    const property = mockProperties.find(p => p.id === numericId);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Convert mock data to match Property type
    const formattedProperty: Property = {
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
      propertyType: property.propertyType === 'Villa' ? 'Single Family' : 
                   (property.propertyType as Property['propertyType']),
      yearBuilt: property.yearBuilt,
      images: property.images,
      features: [],
      status: property.status as Property['status'],
      island: property.location.includes('Kailua') ? 'Oahu' : 
             property.location.includes('Wailea') ? 'Maui' :
             property.location.includes('Princeville') ? 'Kauai' : 'Big Island',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(formattedProperty);
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}