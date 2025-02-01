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
    let properties = [];
    
    if (response && Array.isArray(response)) {
      properties = response;
    } else if (response && Array.isArray(response.props)) {
      properties = response.props;
    } else if (response && Array.isArray(response.results)) {
      properties = response.results;
    }

    // Transform the properties to match our Property interface
    const transformedProperties: Property[] = properties.map((prop: any) => {
      // Parse the price string to get numeric value
      const priceString = prop.price || '0';
      const numericPrice = parseInt(priceString.replace(/[^0-9]/g, '')) || 0;

      // Get city and island from address
      const addressParts = (prop.address || '').split(',');
      const city = addressParts[0]?.trim() || 'Unknown';
      const island = addressParts[1]?.includes('HI') ? addressParts[1].replace('HI', '').trim() : 'Hawaii';

      return {
        id: prop.zpid?.toString() || Math.random().toString(36).substr(2, 9),
        title: prop.name || 'Hawaii Property',
        price: prop.price || '$0',
        description: prop.description || 'Beautiful property in Hawaii',
        image: prop.imgSrc || 'https://via.placeholder.com/800x600?text=Property+Image',
        location: prop.address || 'Hawaii',
        city,
        island,
        beds: prop.beds || 0,
        baths: prop.baths || 0,
        sqft: prop.sqft || 0,
        propertyType: prop.propertyType || zillowPropertyType,
        zillowUrl: prop.detailUrl || undefined,
        numericPrice: numericPrice
      };
    });

    // Apply price range filter if specified
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(p => parseInt(p) || 0);
      return transformedProperties.filter(p => {
        return (!minPrice || p.numericPrice >= minPrice) && 
               (!maxPrice || p.numericPrice <= maxPrice);
      });
    }

    // Sort properties
    if (sortBy) {
      transformedProperties.sort((a, b) => {
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

    return transformedProperties;
  } catch (error) {
    console.error('Error in searchProperties:', error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const allProperties = await searchProperties();
    const property = allProperties.find(p => p.id === id);
    
    if (!property) {
      console.log('Property not found:', id);
      return null;
    }
    
    return property;
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    return null;
  }
}
