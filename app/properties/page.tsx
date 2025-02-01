import { searchProperties } from '@/lib/api/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';

interface PageProps {
  searchParams: {
    island?: string;
    type?: string;
    price?: string;
    sort?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const { island, type, price, sort } = searchParams;
  
  const properties = await searchProperties(
    island || 'all',
    'For Sale',
    type,
    price,
    sort || 'price-asc'
  );

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
            <PropertyFilters defaultSort="price-asc" />
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No properties found.</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
