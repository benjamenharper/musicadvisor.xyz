import Link from 'next/link';
import { Music, Radio, TrendingUp, Users, MessageSquare, Target } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Promotion & Distribution Services',
  description: 'Professional music promotion and distribution services to help artists reach their target audience. Get expert help with marketing, playlist pitching, and digital distribution.',
  keywords: ['music promotion', 'music distribution', 'playlist pitching', 'music marketing', 'digital distribution', 'artist promotion'],
  openGraph: {
    title: 'Music Promotion & Distribution Services',
    description: 'Professional music promotion and distribution services to help artists reach their target audience.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'Music Promotion Services'
      }
    ]
  }
};

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Music Promotion Services</h1>
            <p className="text-muted-foreground text-lg">
              Professional music promotion services to help artists reach their target audience and grow their fanbase
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Music Marketing */}
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Music Marketing</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Targeted Promotion</h3>
                    <p className="text-muted-foreground">
                      Strategic promotion campaigns designed to reach your ideal audience across multiple platforms
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Audience Growth</h3>
                    <p className="text-muted-foreground">
                      Build and engage with your fanbase through social media optimization and content strategy
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">PR & Media Outreach</h3>
                    <p className="text-muted-foreground">
                      Connect with music blogs, playlist curators, and industry professionals to increase visibility
                    </p>
                  </div>
                </div>
                <Link 
                  href={`mailto:osipeters@hotly.com?subject=Music Marketing Inquiry&body=I'm interested in your music marketing services. I would like to learn more about your services.`}
                  className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Start Marketing
                </Link>
              </div>
            </div>

            {/* Music Distribution */}
            <div className="bg-card rounded-lg p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Radio className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Music Distribution</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Music className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Playlist Pitching</h3>
                    <p className="text-muted-foreground">
                      Professional playlist pitching to both editorial and independent curators across major platforms
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Release Strategy</h3>
                    <p className="text-muted-foreground">
                      Comprehensive release planning to maximize impact and reach of your music
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Digital Distribution</h3>
                    <p className="text-muted-foreground">
                      Get your music on all major streaming platforms with professional distribution services
                    </p>
                  </div>
                </div>
                <Link 
                  href={`mailto:osipeters@hotly.com?subject=Music Distribution Inquiry&body=I'm interested in your music distribution services. I would like to learn more about your services.`}
                  className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Start Distribution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
