import { fetchProperties } from '@/lib/api';

export default async function Home() {
  try {
    const properties = await fetchProperties();

    return (
      <main className="bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Featured Properties</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                  <p className="text-2xl font-bold text-blue-600 mb-4">${property.price.toLocaleString()}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Beds</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Baths</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sq Ft</p>
                      <p className="font-semibold">{property.squareFootage}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Year Built</p>
                      <p className="font-semibold">{property.yearBuilt}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching properties:', error);
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Error loading properties</h2>
        <p className="mt-2 text-gray-600">Please try again later</p>
      </div>
    );
  }
}
