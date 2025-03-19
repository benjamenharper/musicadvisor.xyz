import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import angelicaImage from '@/public/angelica-peterson.jpg';
import markImage from '@/public/markjackson.jpg';
import alisonImage from '@/public/alisonjenks.jpg';
import conorImage from '@/public/conormurphy.png';
import { Users } from 'lucide-react';
import { generateCanonicalMetadata } from '@/lib/canonicalUrl';

export const metadata: Metadata = {
  title: 'About MusicAdvisor | Helping Artists & Influencers Thrive',
  description: 'Meet the team behind MusicAdvisor. Industry experts providing guidance and strategies to help artists and music influencers succeed in today\'s digital landscape.',
  keywords: ['music industry experts', 'artist development', 'music influencers', 'music consultants', 'music industry professionals', 'music advisors', 'artist & influencer growth'],
  ...generateCanonicalMetadata('/about'),
  openGraph: {
    title: 'About MusicAdvisor | Helping Artists & Influencers Thrive',
    description: 'Meet the team behind MusicAdvisor. Industry experts providing guidance and strategies to help artists and music influencers succeed.',
    images: [
      {
        url: '/holty.png',
        width: 1200,
        height: 630,
        alt: 'MusicAdvisor Team'
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <main className="bg-background">
      {/* About Banner */}
      <section className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-10 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-indigo-200 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 mb-3">
              Empowering Artists & Influencers to Succeed
            </p>
            <p className="text-lg text-indigo-200 mb-5">
              Dedicated to helping musicians thrive as both artists and influential voices in today's digital landscape
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About MusicAdvisor */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="prose prose-lg">
            <p>
              MusicAdvisor is your ultimate source for music industry analysis, promotional techniques, 
              and professional tips. We navigate music influencers and artists through the ever-evolving digital 
              landscape with actionable tips, in-depth analysis, and music industry news.
            </p>
            <p>
              Our mission is to empower artists to prosper as both creators and as viable voices 
              in the music business. We provide the information, tools, and services artists need to create 
              great work, reach and connect with audiences, and develop sustainable careers in the digital-first 
              music business.
            </p>
            <p>
              Whether you're an emerging artist attempting to increase your exposure or an established 
              act looking to maximize your career, our content is designed to help you reach your 
              goals, connect with your audience, and build your musical passion into a viable career.
            </p>
          </div>
        </section>

        {/* Conor Murphy */}
        <section id="conor-murphy" className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={conorImage}
                alt="Conor Murphy"
                className="rounded-lg object-cover"
                priority
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Link href="/authors/conor-murphy" className="hover:text-indigo-600">
                  Conor Murphy
                </Link>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Music Industry Consultant</h3>
              <div className="prose prose-lg">
                <p>
                  Conor Murphy is a seasoned music industry consultant with a successful track record 
                  in artist management and strategic development. He specializes in business 
                  strategy, career development, and influence building that allows artists to make highly 
                  informed decisions about their careers.
                </p>
                <p>
                  Having worked practically in the music industry for years, Conor provides insightful 
                  opinions regarding artist management, audience development, and planning strategy. Conor's 
                  practical insight helps artists build long-term careers and amplify their influence in today's 
                  competitive music business.
                </p>
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href="https://linkedin.com/in/conor-murphy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  LinkedIn
                </a>
                <a
                  href="https://conormurphy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-indigo-600"
                >
                  Website
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Author */}
        <section id="angelica-peterson" className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={angelicaImage}
                alt="Angelica Peterson"
                className="rounded-lg object-cover"
                priority
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Link href="/authors/angelica-peterson" className="hover:text-indigo-600">
                  Angelica Peterson
                </Link>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Industry Analyst</h3>
              <div className="prose prose-lg">
                <p>
                  Angelica Peterson is our resident industry analyst, bringing data-driven insights 
                  to our content. Her expertise in market trends and audience analysis helps artists 
                  understand and navigate the complex music industry landscape.
                </p>
                <p>
                  As a student of both classical music and digital marketing, Angelica knows the 
                  particular challenges facing musicians today. Her writing focuses on actionable 
                  promotion tips, establishing influence, and artist career growth aimed at those 
                  looking to expand their audience.
                </p>
                <p>
                  When she's not writing for MusicAdvisor, Angelica consults with independent 
                  artists and conducts workshops on music marketing and building influential brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* News Contributor */}
        <section id="mark-jackson" className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={markImage}
                alt="Mark Jackson"
                className="rounded-lg object-cover"
                priority
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Link href="/authors/mark-jackson" className="hover:text-indigo-600">
                  Mark Jackson
                </Link>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Marketing Specialist</h3>
              <div className="prose prose-lg">
                <p>
                  Mark Jackson brings over a decade of experience in music marketing and digital strategy. 
                  His innovative approaches to artist promotion and influence development have helped numerous 
                  musicians build strong, engaged audiences across multiple platforms.
                </p>
                <p>
                  His coverage spans from high-level industry shifts to grassroots movements in the music industry. 
                  Mark's writing combines reportorial precision with explanatory clarity that enables artists to 
                  understand complex industry trends and leverage them to grow their audiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Promotion Strategist */}
        <section id="alison-jenks" className="bg-white rounded-lg shadow-lg p-8 mb-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={alisonImage}
                alt="Alison Jenks"
                className="rounded-lg object-cover"
                priority
                placeholder="blur"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Link href="/authors/alison-jenks" className="hover:text-indigo-600">
                  Alison Jenks
                </Link>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Content Strategist</h3>
              <div className="prose prose-lg">
                <p>
                  Alison Jenks is a digital storyteller and content strategist by trade. With a background 
                  in social media management and music journalism, she has unique expertise in crafting 
                  compelling stories that resonate with individuals and foster engagement.
                </p>
                <p>
                  With a foundation in both music business and digital influence, Alison delivers 
                  actionable tips and tried-and-true strategies for artists looking to thrive in the digital age. 
                  Her writing focuses on achievable steps artists can take to grow their fanbase, build their 
                  influence, and streamline their promotional efforts.
                </p>
                <p>
                  Alison regularly speaks at music business conferences and teaches online workshops 
                  on modern music promotion techniques and building influential artist brands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <div className="prose prose-lg">
            <p>
              Have a question or want to contribute to MusicAdvisor? We would love to hear from you. 
              Contact us at <a href="mailto:contact@musicadvisor.xyz" className="text-indigo-600 hover:text-indigo-700">
              contact@musicadvisor.xyz</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
