import { getPropertyById } from '@/lib/api/properties';
import { notFound } from 'next/navigation';
import PropertyClient from './property-client';

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyById(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PropertyClient property={property} />
    </div>
  );
}
