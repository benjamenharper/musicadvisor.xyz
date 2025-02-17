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
              Create Music Game Experiences
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Host engaging music game rooms where guests can play trivia, guess songs, and connect with fellow music enthusiasts. Monetize through custom experiences and live interactions.
            </p>
            <Link
              href="https://bit.ly/hotlymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Host A Music Game Room
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Interactive Games</h3>
              <p className="text-gray-600">
                Create trivia games, song guessing challenges, and music quizzes. Let fans compete and earn points on the leaderboard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Music Discovery</h3>
              <p className="text-gray-600">
                Share your music through interactive gameplay. Create custom song packages and themed challenges for your community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Building</h3>
              <p className="text-gray-600">
                Build an active community of music enthusiasts. Enable social connections and team-based gameplay.
              </p>
            </div>
          </div>
        </div>

        {/* Monetization Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Artist Monetization</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Live Video Chats</h3>
                </div>
                <p className="text-gray-600">
                  Host exclusive video sessions with winning players. Set custom prices and create tiered access levels for different chat experiences.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Premium Game Content</h3>
                </div>
                <p className="text-gray-600">
                  Create exclusive game packages, special challenges, and VIP trivia rounds. Monetize through custom pricing and subscription models.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Music Game Room?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Create engaging music games, build your community, and start earning from your musical creativity today.
            </p>
            <Link
              href="https://bit.ly/hotlymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Host A Music Game Room
            </Link>
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
                <h3 className="text-xl font-semibold mb-2">Set Up Your Games</h3>
                <p className="text-gray-600">Create and schedule your music games, including trivia, song guessing, and music quizzes.</p>
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
                <p className="text-gray-600">
                  Track your earnings, analyze audience engagement, and optimize your virtual events for maximum impact and revenue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Host A Music Game Room?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of music engagement. Create your virtual music room today and start connecting with your audience in a whole new way.
          </p>
          <Link
            href="https://bit.ly/hotlymusic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Host A Music Game Room
          </Link>
        </div>
      </section>
    </main>
  );
}
