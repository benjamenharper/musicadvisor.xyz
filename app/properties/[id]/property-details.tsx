import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Property } from '@/types/property';

interface PropertyDetailsProps {
  property: Property;
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  if (!property) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Properties
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Images */}
        <div className="relative aspect-4/3 overflow-hidden rounded-lg">
          <Image
            src={property.image}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Property Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          <p className="text-2xl font-bold text-primary mb-6">{property.price}</p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Beds</p>
              <p className="text-lg font-semibold">{property.beds}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Baths</p>
              <p className="text-lg font-semibold">{property.baths}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sq Ft</p>
              <p className="text-lg font-semibold">{property.sqft}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{property.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p className="text-muted-foreground">{property.location}</p>
          </div>

          {property.zillowUrl && (
            <a
              href={property.zillowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              View on Zillow
            </a>
          )}
        </div>
      </div>
    </div>
  );
}