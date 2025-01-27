import Link from 'next/link';
import { FileText, Building2, BookOpen } from 'lucide-react';

const resources = [
  {
    title: 'Hawaii Title Information',
    description: 'Learn about the title process in Hawaii real estate transactions, including title search, insurance, and common issues.',
    icon: FileText,
    href: '/resources/hawaii-title',
    topics: [
      'Understanding Title Insurance',
      'The Title Search Process',
      'Common Title Issues in Hawaii',
      'Protecting Your Property Rights'
    ]
  },
  {
    title: 'Hawaii 1031 Exchange Guide',
    description: 'Everything you need to know about 1031 exchanges in Hawaii, including rules, timelines, and qualified properties.',
    icon: Building2,
    href: '/resources/hawaii-1031-exchange',
    topics: [
      'What is a 1031 Exchange?',
      'Exchange Rules and Timelines',
      'Qualified Properties',
      'Tax Benefits and Considerations'
    ]
  },
  {
    title: 'Hawaii Business Directory',
    description: 'A comprehensive directory of real estate related businesses and services in Hawaii.',
    icon: BookOpen,
    href: '/resources/hawaii-business-directory',
    topics: [
      'Real Estate Services',
      'Property Management',
      'Legal Services',
      'Financial Services'
    ]
  }
];

export default function ResourcesPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Resources</h1>
            <p className="text-muted-foreground text-lg">
              Helpful guides and information for Hawaii real estate
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="group block bg-card rounded-lg p-6 border border-border hover:border-primary transition-colors"
                >
                  <div className="flex items-center mb-4">
                    <Icon className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {resource.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    {resource.description}
                  </p>
                  <ul className="space-y-2">
                    {resource.topics.map((topic) => (
                      <li 
                        key={topic}
                        className="text-sm text-muted-foreground flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
