import { ArrowRight, Music, Radio, Zap, Share2, BarChart2, Users } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Music Journey with Hotly',
  description: 'Discover, share, and promote your music with Hotly. The most advanced music platform for artists and music lovers.',
  keywords: ['hotly music', 'music app', 'music promotion', 'music discovery', 'artist promotion'],
  openGraph: {
    title: 'Start Your Music Journey with Hotly',
    description: 'Discover, share, and promote your music with Hotly.',
  }
};

const features = [
  {
    icon: Music,
    title: 'Advanced Music Discovery',
    description: 'Find new music tailored to your taste with our AI-powered recommendation engine.'
  },
  {
    icon: Share2,
    title: 'Easy Sharing',
    description: 'Share your favorite tracks across all social platforms with just one click.'
  },
  {
    icon: Radio,
    title: 'High-Quality Streaming',
    description: 'Enjoy crystal clear audio with our high-definition streaming technology.'
  },
  {
    icon: BarChart2,
    title: 'Artist Analytics',
    description: 'Get detailed insights about your audience and track performance.'
  },
  {
    icon: Zap,
    title: 'Instant Promotion',
    description: 'Promote your music to targeted audiences and grow your fanbase.'
  },
  {
    icon: Users,
    title: 'Community Features',
    description: 'Connect with other artists and music lovers in our vibrant community.'
  }
];

export default function HotlyPromo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 h-[500px] flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div>
            <h1 className="text-5xl font-bold mb-6 text-left">
              Start Your Music Journey with Hotly
            </h1>
            <p className="text-xl mb-8 text-white text-left">
              The most advanced music platform for artists and music lovers. 
              Discover, share, and promote your music like never before.
            </p>
            <div className="text-left">
              <Link
                href="https://bit.ly/hotlymusic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Everything You Need to Succeed in Music
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hotly provides all the tools and features you need to create, share, and 
              monetize your music. Our platform is designed to help artists at every 
              stage of their career, from emerging talents to established stars.
            </p>
            <div className="grid gap-6">
              {features.slice(0, 3).map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 p-8 rounded-2xl">
              <div className="grid gap-6">
                {features.slice(3).map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="mt-1 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Your Music to the Next Level?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Join thousands of artists who are already using Hotly to grow their audience 
            and advance their music career.
          </p>
          <Link
            href="https://bit.ly/hotlymusic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Get Started with Hotly
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Mini Banner */}
        <div className="mt-32 mb-20">
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl shadow-lg border border-blue-200/30">
            <div className="px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
              <p className="text-gray-700 text-xl font-medium">
                Start creating and sharing your music today
              </p>
              <Link
                href="https://bit.ly/hotlymusic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-blue-300 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 whitespace-nowrap shadow-sm"
              >
                Try Hotly Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
