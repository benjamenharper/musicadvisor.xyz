import { Property } from '@/types/property';
import { getExtendedSearchResults } from '@/lib/zillowAPI';

/* Updated searchProperties function to use Zillow Extended Search API for island queries */

export async function searchProperties(
  island: string = 'all',
  status: string = 'For Sale',
  propertyType?: string,
  priceRange?: string,
  sortBy: string = 'price-asc'
): Promise<Property[]> {
  try {
    console.log('searchProperties called with:', { island, status, propertyType, priceRange, sortBy });

    // Map island to location string
    const islandMapping: Record<string, string> = {
      maui: 'Maui, HI',
      oahu: 'Honolulu, HI',
      hawaii: 'Hawaii Island, HI',
      kauai: 'Kauai, HI'
    };

    const location = islandMapping[island.toLowerCase()] || 'Hawaii';
    console.log('Searching for properties in location:', location);

    // Map our property types to Zillow's property types
    const propertyTypeMapping: Record<string, string> = {
      'single_family': 'Houses',
      'condo': 'Condos',
      'townhouse': 'Townhomes',
      'multi_family': 'Multi-family',
      'land': 'Lots/Land'
    };

    const zillowPropertyType = propertyType ? propertyTypeMapping[propertyType] || 'Houses' : 'Houses';
    const response = await getExtendedSearchResults(location, 'ForSale', zillowPropertyType);
    console.log('Raw Zillow API Response:', response);

    // Extract properties from response
    const properties = [];
    
    if (response && Array.isArray(response)) {
      properties.push(...response);
    } else if (response && Array.isArray(response.props)) {
      properties.push(...response.props);
    } else if (response && Array.isArray(response.results)) {
      properties.push(...response.results);
    }

    console.log('Extracted properties:', properties);

    if (properties.length === 0) {
      console.log('No properties found in response');
      return [];
    }

    // Map the properties to our Property type
    let mappedProperties = properties.map((prop: any) => {
      // Parse the price value from Zillow API
      const priceStr = prop.price || prop.listPrice || '';
      const numericPrice = typeof prop.price === 'number' 
        ? prop.price 
        : parseInt(priceStr.replace(/[$,]/g, '')) || 0;

      // Extract city and island from address
      const address = prop.address || prop.streetAddress || '';
      const addressParts = address.split(',').map(part => part.trim());
      const city = addressParts[1] || '';
      const stateZip = addressParts[2] || '';
      const islandMap: Record<string, string> = {
        'Honolulu': 'Oahu',
        'Kapolei': 'Oahu',
        'Kailua': 'Oahu',
        'Kahului': 'Maui',
        'Kihei': 'Maui',
        'Lahaina': 'Maui',
        'Hilo': 'Big Island',
        'Kailua-Kona': 'Big Island',
        'Lihue': 'Kauai',
        'Kapaa': 'Kauai',
      };
      const island = islandMap[city] || location.split(',')[0].trim();
      
      return {
        id: prop.zpid?.toString() || prop.id?.toString() || '',
        title: prop.statusText || prop.address || '',
        price: priceStr,
        description: `${prop.beds || prop.bedrooms || 0} beds, ${prop.baths || prop.bathrooms || 0} baths`,
        image: prop.imgSrc || prop.imageUrl || 'https://via.placeholder.com/800x600?text=Property+Image',
        location: address,
        city,
        island,
        beds: prop.beds || prop.bedrooms || 0,
        baths: prop.baths || prop.bathrooms || 0,
        sqft: prop.area || prop.livingArea || 0,
        propertyType: prop.homeType || prop.propertyType || zillowPropertyType,
        zillowUrl: prop.zpid ? `https://www.zillow.com/homedetails/${prop.zpid}_zpid/` : '',
        numericPrice
      };
    });

    // Filter by price range if specified
    if (priceRange) {
      const [minStr, maxStr] = priceRange.split('-');
      const min = parseInt(minStr);
      const max = parseInt(maxStr);

      mappedProperties = mappedProperties.filter(prop => {
        return prop.numericPrice >= min && prop.numericPrice <= max;
      });
    }

    // Sort properties based on sortBy parameter
    if (sortBy) {
      mappedProperties = mappedProperties.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.numericPrice - b.numericPrice;
          case 'price-desc':
            return b.numericPrice - a.numericPrice;
          default:
            return 0;
        }
      });
    }

    console.log('Mapped and sorted properties:', mappedProperties);
    return mappedProperties;

  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    // Search in all locations to find the property
    const locations = ['oahu', 'maui', 'hawaii', 'kauai'];
    
    for (const location of locations) {
      const properties = await searchProperties(
        location,
        'For Sale',
        undefined,
        undefined,
        'price-asc'
      );
      
      const property = properties.find(p => p.id === id);
      if (property) {
        return property;
      }
    }

    console.log('Property not found with ID:', id);
    return null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw error;
  }
}
