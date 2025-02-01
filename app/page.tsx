import { mockProperties } from '@/lib/mockData';

export default function Home() {
  const properties = mockProperties;

  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Featured Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gray-200">
                  {/* Image placeholder - in production, use next/image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Property Image
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{property.title}</h2>
                  <span className="px-2 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded">
                    {property.status}
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${property.price.toLocaleString()}
                </p>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
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
                    <p className="font-semibold">{property.squareFootage.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year Built</p>
                    <p className="font-semibold">{property.yearBuilt}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm line-clamp-2">{property.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
