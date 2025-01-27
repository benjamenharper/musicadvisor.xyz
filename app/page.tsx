import { searchProperties } from '@/lib/api/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import PropertyFilters from '@/components/properties/PropertyFilters';
import CalloutPanel from '@/components/CalloutPanel';

export default async function Home() {
  const properties = await searchProperties();

  return (
    <div>
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <PropertyFilters />
          
          {/* Featured Properties */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </main>
      <CalloutPanel />
    </div>
  );
}
