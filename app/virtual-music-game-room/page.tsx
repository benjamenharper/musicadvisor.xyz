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
              Create Song Trivia Games & Social Music Experiences
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Build an engaging community space where guests can play song trivia, guess your music, and connect with fellow music enthusiasts. Monetize through custom-priced live video chats and exclusive experiences.
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
            <h2 className="text-3xl font-bold mb-6">Connect Through Music Games</h2>
            <p className="text-lg text-gray-600 mb-8">
              Create a vibrant community space where music brings people together. Host engaging trivia games, song guessing challenges, and foster meaningful connections between your guests.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Interactive Music Games</h3>
                <p className="text-gray-600">
                  Design custom song trivia and guessing games based on your music. Create engaging challenges that bring your community together and showcase your content.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Social & Monetization</h3>
                <p className="text-gray-600">
                  Enable guests to connect and make new friends while enjoying your music. Monetize through custom-priced live video chats and exclusive community experiences.
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
