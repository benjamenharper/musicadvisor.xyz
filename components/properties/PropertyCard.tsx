import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
            {property.status}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold">{formatPrice(property.price)}</h3>
          <p className="mt-1 text-muted-foreground">{property.title}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>{property.bedrooms}</span>
              <span>bed</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{property.bathrooms}</span>
              <span>bath</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{property.squareFeet.toLocaleString()}</span>
              <span>sqft</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
      </div>
    </Link>
  );
}
