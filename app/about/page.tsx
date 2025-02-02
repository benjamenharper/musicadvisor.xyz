import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
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
          <section className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-48 h-48 relative flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src="/musicianscropped.png"
                  alt="Angelica Peterson"
                  width={192}
                  height={192}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Angelica Peterson</h2>
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
      </div>
    </main>
  );
}
