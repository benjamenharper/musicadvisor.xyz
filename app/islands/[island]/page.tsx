/* Updated dynamic island page with island blurbs */
'use server';

import { searchProperties } from '@/lib/api/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import { notFound } from 'next/navigation';

interface IslandPageProps {
  params: {
    island: string;
  };
  searchParams: {
    sort?: string;
  };
}

export default async function IslandPage({ params, searchParams }: IslandPageProps) {
  const { island } = params;
  const sort = searchParams.sort || 'price-asc';
  
  // Validate island name
  const validIslands = ['maui', 'oahu', 'hawaii', 'kauai'];
  if (!validIslands.includes(island.toLowerCase())) {
    notFound();
  }

  const properties = await searchProperties(island, 'For Sale', undefined, undefined, sort);

  // Define island blurbs
  const islandBlurbs: Record<string, string> = {
    oahu: "Oahu – the heart of Hawaii with a blend of city vibes and scenic natural beauty.",
    maui: "Maui Real Estate stands as a gem of island living for those looking to immerse themselves in a distinctive and captivating lifestyle. Situated in the heart of the Hawaiian archipelago, Maui, often celebrated as the 'Valley Isle,' presents a wide array of real estate choices, ranging from opulent oceanfront estates to charming, hidden residences amidst stunning scenery. This guide is designed to explore the depths of Maui’s real estate market, providing insights into the island’s varied locales, types of properties, and investment potentials. Whether you’re in search of a peaceful sanctuary or a profitable investment, Maui Real Estate offers a passage to one of the most desired locations globally, blending extraordinary natural beauty with a deep cultural heritage.",
    hawaii: "The Big Island offers rugged landscapes and volcanic wonders, perfect for adventurous homeowners.",
    kauai: "Kauai, the Garden Isle, is known for its lush greenery, dramatic cliffs, and serene surroundings, ideal for a tranquil retreat."
  };

  const blurb = islandBlurbs[island.toLowerCase()] || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <h1 className="text-4xl font-bold mb-4 capitalize">{island} Properties</h1>
        {blurb && <p className="mb-8 text-lg text-muted-foreground">{blurb}</p>}
        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No properties found for {island}.</p>
            <p className="text-gray-500 mt-2">Please try again later or check another island.</p>
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
  );
}
