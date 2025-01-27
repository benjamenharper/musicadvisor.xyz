'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import { searchProperties } from '@/lib/api/properties';
import { Property } from '@/types/property';

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const island = searchParams.get('island') || 'oahu';
        const type = searchParams.get('type');
        const price = searchParams.get('price');
        const sort = searchParams.get('sort') || 'date-desc';

        // Convert price range to min/max values
        let minPrice, maxPrice;
        if (price) {
          const [min, max] = price.split('-').map(Number);
          minPrice = min;
          maxPrice = max;
        }

        const results = await searchProperties(island, 'sale');
        
        // Apply filters
        let filteredResults = results;
        
        if (type) {
          filteredResults = filteredResults.filter(p => 
            p.propertyType.toLowerCase() === type.toLowerCase()
          );
        }
        
        if (minPrice !== undefined && maxPrice !== undefined) {
          filteredResults = filteredResults.filter(p => 
            p.price >= minPrice && p.price <= maxPrice
          );
        }

        // Apply sorting
        filteredResults.sort((a, b) => {
          switch (sort) {
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            case 'date-desc':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'date-asc':
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            default:
              return 0;
          }
        });

        setProperties(filteredResults);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Hawaii Real Estate</h1>
            <p className="mt-2 text-muted-foreground">
              Discover luxury homes and properties across the Hawaiian Islands
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <PropertyFilters />
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No properties found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
