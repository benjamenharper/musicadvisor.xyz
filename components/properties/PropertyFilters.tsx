'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const islands = [
  { value: 'oahu', label: 'Oahu' },
  { value: 'maui', label: 'Maui' },
  { value: 'hawaii', label: 'Big Island' },
  { value: 'kauai', label: 'Kauai' },
];

const propertyTypes = [
  { value: 'single_family', label: 'Single Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi_family', label: 'Multi-family' },
  { value: 'land', label: 'Land' }
];

const priceRanges = [
  { value: '0-500000', label: 'Under $500K' },
  { value: '500000-1000000', label: '$500K - $1M' },
  { value: '1000000-2000000', label: '$1M - $2M' },
  { value: '2000000-5000000', label: '$2M - $5M' },
  { value: '5000000-999999999', label: '$5M+' },
];

const sortOptions = [
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
];

export default function PropertyFilters({ defaultSort = 'price-asc' }: { defaultSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filter values from URL or use defaults
  const currentIsland = searchParams.get('island') || 'oahu';  
  const currentType = searchParams.get('type') || '';
  const currentPrice = searchParams.get('price') || '';
  const currentSort = searchParams.get('sort') || defaultSort;

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <label htmlFor="island" className="text-sm font-medium mb-2 text-muted-foreground">
          Island
        </label>
        <select
          id="island"
          value={currentIsland}
          onChange={(e) => updateFilters('island', e.target.value)}
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {islands.map((island) => (
            <option key={island.value} value={island.value}>
              {island.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="type" className="text-sm font-medium mb-2 text-muted-foreground">
          Property Type
        </label>
        <select
          id="type"
          value={currentType}
          onChange={(e) => updateFilters('type', e.target.value)}
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">All Types</option>
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-medium mb-2 text-muted-foreground">
          Price Range
        </label>
        <select
          id="price"
          value={currentPrice}
          onChange={(e) => updateFilters('price', e.target.value)}
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <option value="">Any Price</option>
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="sort" className="text-sm font-medium mb-2 text-muted-foreground">
          Sort By
        </label>
        <select
          id="sort"
          value={currentSort}
          onChange={(e) => updateFilters('sort', e.target.value)}
          className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
