import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Wrench, Share2, BarChart, Zap, Sparkles, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tools for Artists & Influencers',
  description: 'Discover powerful tools for music artists and influencers to create viral experiences, engage with fans, and monetize their content. Explore PlayWit.me for creating interactive experiences.',
  keywords: ['artist tools', 'influencer tools', 'music artist', 'music influencer', 'PlayWit.me', 'fan engagement', 'creator tools', 'music monetization'],
  openGraph: {
    title: 'Tools for Artists & Influencers | MusicAdvisor.xyz',
    description: 'Discover powerful tools for music artists and influencers to create viral experiences, engage with fans, and monetize their content.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'Tools for Artists & Influencers'
      }
    ]
  }
};

export default function ToolsPage() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-indigo-200 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Tools for Artists & Influencers</h1>
            </div>
            <p className="text-xl text-indigo-100 mb-8">
              Powerful platforms to help music artists and influencers create engaging experiences, grow their audience, and monetize their content
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* PlayWit.me Tool */}
          <div className="max-w-6xl mx-auto mb-24 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-12">
                <h2 className="text-3xl font-bold mb-6">PlayWit.me</h2>
                <p className="text-xl mb-6">
                  Create viral interactive experiences and monetize your artistry and influence
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <Zap className="w-5 h-5 text-indigo-200 mr-3 mt-1 flex-shrink-0" />
                    <span>Build engaging interactive experiences that capture audience attention</span>
                  </li>
                  <li className="flex items-start">
                    <Share2 className="w-5 h-5 text-indigo-200 mr-3 mt-1 flex-shrink-0" />
                    <span>Create content that naturally encourages sharing and virality</span>
                  </li>
                  <li className="flex items-start">
                    <BarChart className="w-5 h-5 text-indigo-200 mr-3 mt-1 flex-shrink-0" />
                    <span>Generate revenue through multiple monetization strategies</span>
                  </li>
                </ul>
                <Link
                  href="https://bit.ly/playwitmelink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
                >
                  Get Started with PlayWit.me
                </Link>
              </div>
              <div className="md:w-1/2 p-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Perfect for Artists & Influencers</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Grow Your Audience</h4>
                    <p className="text-gray-600">
                      Design interactive experiences that naturally encourage sharing and audience growth, expanding your reach beyond traditional content.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Monetize Your Art & Influence</h4>
                    <p className="text-gray-600">
                      Convert your audience into revenue through subscriptions, virtual goods, sponsorships, and more.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">No Coding Required</h4>
                    <p className="text-gray-600">
                      Focus on creativity, not technology. Create professional interactive experiences with our intuitive tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How This Tool Helps Artists & Influencers */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How This Tool Amplifies Your Artistry & Influence</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-start gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Stand Out in a Crowded Space</h3>
                <p className="text-gray-600">Differentiate yourself from other artists and content creators with interactive experiences that go beyond traditional content formats.</p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Diversify Your Revenue Streams</h3>
                <p className="text-gray-600">Move beyond streaming, ad revenue and sponsorships. Create monetizable experiences that fans are willing to pay for.</p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Foster a Thriving Community</h3>
                <p className="text-gray-600">
                  Transform passive followers into active participants. Build a community that supports your creative growth and amplifies your reach.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-xl">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gain Valuable Audience Insights</h3>
                <p className="text-gray-600">
                  Learn more about your audience through their interactions. Understand what resonates with them and use that knowledge to create more impactful content and art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Amplify Your Artistry & Influence?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
            Start creating engaging experiences that help you connect with fans, grow your audience, and monetize your art and influence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="https://bit.ly/playwitmelink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Try PlayWit.me
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
