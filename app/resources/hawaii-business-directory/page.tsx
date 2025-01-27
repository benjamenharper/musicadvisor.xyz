import { Building2, Scale, BadgeDollarSign, Home, Search, Wrench } from 'lucide-react';

const categories = [
  {
    title: 'Real Estate Services',
    icon: Home,
    businesses: [
      {
        name: 'Title Companies',
        items: [
          'First American Title',
          'Title Guaranty',
          'Fidelity National Title',
        ]
      },
      {
        name: 'Property Management',
        items: [
          'Hawaii Property Management',
          'Elite Pacific Properties',
          'Locations LLC',
        ]
      },
      {
        name: 'Real Estate Photography',
        items: [
          'Hawaii Real Estate Photography',
          '360 Property Tours Hawaii',
          'Architectural Photography Hawaii',
        ]
      }
    ]
  },
  {
    title: 'Legal Services',
    icon: Scale,
    businesses: [
      {
        name: 'Real Estate Attorneys',
        items: [
          'Hawaii Real Estate Legal Group',
          'Pacific Law Group',
          'Island Estate Law',
        ]
      },
      {
        name: 'Estate Planning',
        items: [
          'Hawaii Estate Planning Law',
          'Legacy Planning Hawaii',
          'Trust & Estate Law Group',
        ]
      }
    ]
  },
  {
    title: 'Financial Services',
    icon: BadgeDollarSign,
    businesses: [
      {
        name: 'Mortgage Lenders',
        items: [
          'Bank of Hawaii',
          'First Hawaiian Bank',
          'American Savings Bank',
        ]
      },
      {
        name: 'Financial Advisors',
        items: [
          'Hawaii Investment Partners',
          'Pacific Wealth Management',
          'Island Financial Advisors',
        ]
      }
    ]
  },
  {
    title: 'Home Services',
    icon: Wrench,
    businesses: [
      {
        name: 'Home Inspectors',
        items: [
          'Hawaii Home Inspections',
          'Property Inspection Pros',
          'Certified Island Inspectors',
        ]
      },
      {
        name: 'Contractors',
        items: [
          'Hawaii General Contractors',
          'Island Builders Association',
          'Pacific Construction Group',
        ]
      },
      {
        name: 'Pest Control',
        items: [
          'Terminix Hawaii',
          'Bowman Termite & Pest',
          'Kilauea Pest Control',
        ]
      }
    ]
  }
];

export default function HawaiiBusinessDirectoryPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Hawaii Business Directory</h1>
            <p className="text-muted-foreground text-lg">
              A comprehensive directory of real estate related businesses and services in Hawaii
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search businesses..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="bg-card rounded-lg border border-border p-6">
                  <div className="flex items-center mb-6">
                    <Icon className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-2xl font-semibold">{category.title}</h2>
                  </div>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {category.businesses.map((business) => (
                      <div key={business.name}>
                        <h3 className="font-semibold mb-3">{business.name}</h3>
                        <ul className="space-y-2">
                          {business.items.map((item) => (
                            <li 
                              key={item}
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              This directory is provided for informational purposes only. 
              Listings do not constitute endorsement or recommendation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
