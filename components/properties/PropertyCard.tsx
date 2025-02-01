import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Early return if property is undefined or null
  if (!property) {
    return null;
  }

  const {
    id,
    title = 'No Title',
    price = 'Price not available',
    image = '',
    beds = 0,
    baths = 0,
    sqft = 0,
    city,
    island,
    location = ''
  } = property;

  return (
    <Link href={`/properties/${id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || 'https://via.placeholder.com/800x600?text=Property+Image'}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
            {/* Removed status */}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold">{formatPrice(price)}</h3>
          <p className="mt-1 text-muted-foreground">{title}</p>
          
          {/* Location */}
          <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="font-medium">{city}</span>
            {island && <span className="text-muted-foreground"> • {island}</span>}
          </div>
          
          {/* Property Details */}
          <div className="mt-2 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span className="font-medium">{beds}</span> bed
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span className="font-medium">{baths}</span> bath
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span className="font-medium">{sqft.toLocaleString()}</span> sqft
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
