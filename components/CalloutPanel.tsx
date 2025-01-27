import Link from 'next/link';
import { Bell, Home, DollarSign } from 'lucide-react';

export default function CalloutPanel() {
  return (
    <div className="bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Alerts */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/80 backdrop-blur shadow-sm">
            <Bell className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Property Alerts</h3>
            <p className="text-muted-foreground mb-4">
              Get notified when new properties match your criteria
            </p>
            <Link
              href="/alerts"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
            >
              Set Up Alerts →
            </Link>
          </div>

          {/* Buy */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/80 backdrop-blur shadow-sm">
            <Home className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Buy Property</h3>
            <p className="text-muted-foreground mb-4">
              Find your dream home in Hawaii
            </p>
            <Link
              href="/properties"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
            >
              View Properties →
            </Link>
          </div>

          {/* Sell */}
          <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/80 backdrop-blur shadow-sm">
            <DollarSign className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sell Property</h3>
            <p className="text-muted-foreground mb-4">
              Get the best value for your property
            </p>
            <Link
              href="/sell"
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
