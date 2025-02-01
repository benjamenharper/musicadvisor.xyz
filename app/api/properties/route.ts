import { NextResponse } from 'next/server';
import { mockProperties } from '@/lib/mockData';
import { Property } from '@/types/property';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Log incoming request parameters
    console.log('API Request Parameters:', Object.fromEntries(searchParams.entries()));
    console.log('Initial mock properties count:', mockProperties.length);

    // First, map all properties to the correct format
    let properties = mockProperties.map(property => ({
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
      status: 'For Sale', // Set all properties to For Sale
      island: property.location.includes('Kailua') ? 'Oahu' :
             property.location.includes('Wailea') ? 'Maui' :
             property.location.includes('Princeville') ? 'Kauai' : 'Big Island',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    console.log('After mapping:', properties.length);

    // Get filter parameters
    const island = searchParams.get('island');
    const propertyType = searchParams.get('type');
    const priceRange = searchParams.get('price');
    const sortBy = searchParams.get('sort');

    // Filter by island (only if not 'all')
    if (island && island !== 'all') {
      const islandMap: Record<string, Property['island']> = {
        'oahu': 'Oahu',
        'maui': 'Maui',
        'kauai': 'Kauai',
        'hawaii': 'Big Island'
      };
      properties = properties.filter(p => p.island === islandMap[island]);
      console.log('After island filter:', properties.length, 'Island:', island);
    }

    // Filter by property type
    if (propertyType) {
      const beforeCount = properties.length;
      properties = properties.filter(p => 
        p.propertyType.toLowerCase() === propertyType.toLowerCase()
      );
      console.log('After property type filter:', properties.length, 'Type:', propertyType);
      if (properties.length === 0) {
        console.log('Available property types:', [...new Set(mockProperties.map(p => p.propertyType))]);
      }
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      properties = properties.filter(p => p.price >= min && p.price <= max);
      console.log('After price filter:', properties.length, 'Range:', priceRange);
    }

    // Sort properties
    if (sortBy) {
      properties.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'date-desc') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'date-asc') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return 0;
      });
      console.log('After sorting:', properties.length, 'Sort:', sortBy);
    }

    // Log final results
    console.log('Final properties count:', properties.length);
    console.log('Property IDs being returned:', properties.map(p => p.id));

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}