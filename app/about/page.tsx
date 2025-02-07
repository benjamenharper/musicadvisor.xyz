import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import angelicaImage from '@/public/angelica-peterson.jpg';
import markImage from '@/public/markjackson.jpg';
import alisonImage from '@/public/alisonjenks.jpg';
import conorImage from '@/public/conormurphy.png';

export const metadata: Metadata = {
  title: 'About Our Music Industry Experts',
  description: 'Meet the team behind MusicAdvisor. Industry experts providing guidance and strategies to help artists succeed in today\'s music industry.',
  keywords: ['music industry experts', 'music consultants', 'music industry professionals', 'music advisors', 'artist development team'],
  openGraph: {
    title: 'About Our Music Industry Experts',
    description: 'Meet the team behind MusicAdvisor. Industry experts providing guidance and strategies to help artists succeed.',
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About MusicAdvisor */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About MusicAdvisor</h1>
          <div className="prose prose-lg">
            <p>
              MusicAdvisor is your trusted source for music industry insights, promotion strategies, 
              and expert advice. We help artists navigate the ever-evolving music landscape with 
              actionable tips, in-depth analysis, and industry news.
            </p>
            <p>
              Our mission is to empower musicians with the knowledge and tools they need to thrive 
              in today&apos;s digital music industry. Whether you&apos;re an emerging artist or an established 
              performer, our content is designed to help you reach your goals and connect with your audience.
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
                  Conor Murphy is a seasoned music industry consultant with a proven track record 
                  in artist management and strategic growth. His expertise spans across business 
                  strategy, career development, and industry consulting, helping artists make 
                  informed decisions about their careers.
                </p>
                <p>
                  With years of hands-on experience in the music industry, Conor provides valuable 
                  insights into artist management, business development, and strategic planning. His 
                  practical approach helps artists build sustainable careers in today&apos;s competitive 
                  music landscape.
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
                  to our content. Her expertise in market trends and industry analytics helps artists 
                  understand and navigate the complex music business landscape.
                </p>
                <p>
                  With a background in both classical music and digital marketing, Angelica 
                  understands the unique challenges faced by today&apos;s musicians. Her articles 
                  focus on practical promotion strategies, industry trends, and professional 
                  development for artists.
                </p>
                <p>
                  When she&apos;s not writing for MusicAdvisor, Angelica consults with independent 
                  artists and conducts workshops on music marketing and brand development.
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
                  His innovative approaches to artist promotion and brand development have helped numerous 
                  musicians build strong, engaged audiences across multiple platforms.
                </p>
                <p>
                  His coverage spans from major industry shifts to grassroots movements in the music 
                  scene. Mark&apos;s writing style combines journalistic precision with accessible 
                  explanations that help our readers understand complex industry developments.
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
                  Alison Jenks specializes in content strategy and digital storytelling. Her background 
                  in music journalism and social media management gives her unique insights into creating 
                  compelling narratives that resonate with audiences and drive engagement.
                </p>
                <p>
                  With a background in both music business and digital marketing, Alison provides 
                  actionable insights and proven strategies for music promotion in the digital age. 
                  Her articles focus on practical steps artists can take to grow their fanbase and 
                  maximize their promotional efforts.
                </p>
                <p>
                  Alison regularly speaks at music industry conferences and conducts online workshops 
                  on modern music promotion techniques and social media strategy for musicians.
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
              Have a question or want to contribute to MusicAdvisor? We&apos;d love to hear from you. 
              Contact us at <a href="mailto:contact@musicadvisor.xyz" className="text-indigo-600 hover:text-indigo-700">
              contact@musicadvisor.xyz</a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
