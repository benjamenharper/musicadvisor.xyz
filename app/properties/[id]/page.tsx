import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Check } from 'lucide-react';
import { getProperty } from '@/lib/api/properties';
import { formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate every hour

interface Props {
  params: {
    id: string;
  };
}

export default async function PropertyPage({ params }: Props) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/properties"
              className="text-muted-foreground hover:text-foreground flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Properties</span>
            </Link>
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-2xl font-semibold text-primary">
                  {formatPrice(property.price)}
                </p>
                <p className="text-muted-foreground">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
              </div>

              {/* Property Image */}
              <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
                  priority
                />
              </div>

              {/* Property Details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-muted-foreground">Bedrooms</p>
                    <p className="font-medium">{property.bedrooms}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bathrooms</p>
                    <p className="font-medium">{property.bathrooms}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Square Feet</p>
                    <p className="font-medium">{property.squareFeet.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Year Built</p>
                    <p className="font-medium">{property.yearBuilt}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="Your phone"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      placeholder="I'm interested in this property..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
