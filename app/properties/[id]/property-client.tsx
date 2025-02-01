'use client';

import Image from 'next/image';
import { getPropertyById } from '@/lib/api/properties';
import { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils';
import { Bed, Bath, Square, ExternalLink, MapPin, Home } from 'lucide-react';
import Link from 'next/link';

interface PropertyClientProps {
  id: string;
}

export default async function PropertyClient({ id }: PropertyClientProps) {
  const property = await getPropertyById(id);

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Property not found</p>
        <p className="text-gray-500 mt-2">The property you're looking for may have been removed or is no longer available.</p>
      </div>
    );
  }

  const {
    title,
    price,
    description,
    image,
    beds,
    baths,
    sqft,
    location,
    city,
    island,
    propertyType,
    zillowUrl
  } = property;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/properties" className="text-blue-600 hover:text-blue-800">
          ← Back to Properties
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src={image || 'https://via.placeholder.com/800x600?text=Property+Image'}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6">
          {/* Price and Location */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{formatPrice(price)}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5 flex-shrink-0" />
              <p>{location}</p>
            </div>
          </div>

          {/* Property Quick Facts */}
          <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-lg font-semibold">{beds}</p>
                <p className="text-sm text-gray-600">Beds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-lg font-semibold">{baths}</p>
                <p className="text-sm text-gray-600">Baths</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-lg font-semibold">{sqft.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sq Ft</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-lg font-semibold capitalize">{propertyType}</p>
                <p className="text-sm text-gray-600">Type</p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <div className="flex flex-col gap-1 text-gray-600">
              <p>{location}</p>
              <p>{city}, {island}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About This Property</h2>
            <div className="prose text-gray-600">
              <p>{description}</p>
            </div>
          </div>

          {/* External Links */}
          <div className="border-t pt-6">
            {zillowUrl && (
              <a
                href={zillowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                View on Zillow <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}