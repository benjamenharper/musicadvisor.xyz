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
              Convert Your Songs Into Monetized Games & Experiences
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Transform your music library into interactive games and immersive experiences. Create unique musical challenges, puzzles, and adventures that your audience will love.
            </p>
            <Link
              href="https://bit.ly/hotlymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Launch A Music Game Room
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Turn Your Music Into Interactive Games</h2>
            <p className="text-lg text-gray-600 mb-8">
              Create engaging musical experiences that your audience can play, share, and enjoy. From rhythm games to music discovery adventures, the possibilities are endless.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Game Creation Tools</h3>
                <p className="text-gray-600">
                  Easy-to-use tools for converting your songs into interactive games. No coding required - just your music and creativity.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Monetization Options</h3>
                <p className="text-gray-600">
                  Set your own pricing, offer subscriptions, or create premium game content. Multiple ways to earn from your musical games.
                </p>
              </div>
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
            Launch A Music Game Room
          </Link>
        </div>
      </section>
    </main>
  );
}
