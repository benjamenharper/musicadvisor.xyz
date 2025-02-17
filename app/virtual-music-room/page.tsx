import Link from 'next/link';
import Image from 'next/image';

export default function VirtualMusicRoom() {
  return (
    <main className="bg-background">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Create Your Own Virtual Music Room
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Transform your music into an interactive experience. Host, monetize, and grow your community with Hotly.
            </p>
            <Link
              href="https://bit.ly/hotlymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Launch A Music Room
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Exclusive Listening Sessions</h3>
              <p className="text-gray-600">
                Preview new tracks, host album listening parties, and create intimate musical experiences for your dedicated fans.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Virtual Concerts</h3>
              <p className="text-gray-600">
                Perform live for your global audience. Create immersive concert experiences with high-quality audio streaming.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Flexible Monetization</h3>
              <p className="text-gray-600">
                Set your own pricing models. Offer subscriptions, one-time tickets, or exclusive memberships to your music rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Room</h3>
                <p className="text-gray-600">Sign up and create your personalized virtual music room in minutes. Customize your room's appearance and settings to match your brand.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Set Up Your Events</h3>
                <p className="text-gray-600">Schedule your events - whether they're listening sessions, live performances, or workshops. Set your pricing and access levels.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Engage Your Audience</h3>
                <p className="text-gray-600">Connect with your audience through chat, reactions, and interactive features. Build a community around your music.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">4</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Grow Your Revenue</h3>
                <p className="text-gray-600">Track your earnings, analyze audience engagement, and optimize your virtual events for maximum impact and revenue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Virtual Music Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of music engagement. Create your virtual music room today and start connecting with your audience in a whole new way.
          </p>
          <Link
            href="https://bit.ly/hotlymusic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Launch A Music Room
          </Link>
        </div>
      </section>
    </main>
  );
}
