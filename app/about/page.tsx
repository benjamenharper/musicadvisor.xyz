import Image from 'next/image';
import angelicaImage from '@/public/angelica-peterson.jpg';
import markImage from '@/public/markjackson.jpg';
import alisonImage from '@/public/alisonjenks.jpg';

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
                <a href="#angelica-peterson" className="hover:text-indigo-600">
                  Angelica Peterson
                </a>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Featured Author</h3>
              <div className="prose prose-lg">
                <p>
                  Angelica Peterson is a music industry veteran with over a decade of experience 
                  in artist development and digital marketing. As our featured author, she brings 
                  her extensive knowledge and practical insights to help artists navigate their 
                  musical journey.
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
                <a href="#mark-jackson" className="hover:text-indigo-600">
                  Mark Jackson
                </a>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">News Contributor</h3>
              <div className="prose prose-lg">
                <p>
                  Mark Jackson brings fresh perspectives and timely insights to MusicAdvisor&apos;s news 
                  coverage. With his finger on the pulse of the music industry, Mark covers breaking 
                  news, emerging trends, and significant developments that impact artists and music 
                  professionals.
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
                <a href="#alison-jenks" className="hover:text-indigo-600">
                  Alison Jenks
                </a>
              </h2>
              <h3 className="text-lg text-indigo-600 mb-4">Promotion Strategist</h3>
              <div className="prose prose-lg">
                <p>
                  Alison Jenks is a digital marketing specialist with a passion for helping musicians 
                  build their online presence. Her expertise in social media strategy, content marketing, 
                  and audience engagement has helped numerous artists expand their reach and connect with 
                  their target audience.
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
