import Link from 'next/link';
import { Home, DollarSign, Search, Clipboard, Key, TrendingUp } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-muted-foreground text-lg">
              Expert guidance for buying or selling your home in Oahu
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buy A House */}
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Home className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Buy A House</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Search className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Property Search Assistance</h3>
                    <p className="text-muted-foreground">
                      Access to exclusive listings and personalized property recommendations based on your preferences
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clipboard className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Market Analysis</h3>
                    <p className="text-muted-foreground">
                      Detailed market analysis to ensure you make an informed decision and get the best value
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Key className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Closing Support</h3>
                    <p className="text-muted-foreground">
                      Expert guidance through negotiations, inspections, and the closing process
                    </p>
                  </div>
                </div>
                <Link 
                  href="/contact?service=buy"
                  className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Start Your Home Search
                </Link>
              </div>
            </div>

            {/* Sell A House */}
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <DollarSign className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Sell A House</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Property Valuation</h3>
                    <p className="text-muted-foreground">
                      Professional assessment of your property's value based on current market conditions
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Search className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Marketing Strategy</h3>
                    <p className="text-muted-foreground">
                      Comprehensive marketing plan including professional photography and targeted advertising
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clipboard className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Transaction Management</h3>
                    <p className="text-muted-foreground">
                      Full-service support from listing to closing, including paperwork and negotiations
                    </p>
                  </div>
                </div>
                <Link 
                  href="/contact?service=sell"
                  className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Get Your Home Value
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
