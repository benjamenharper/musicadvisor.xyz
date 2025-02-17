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
              Host fun music games where guests can play song trivia, guess songs, and connect with fellow music enthusiasts. Build a community around your music through interactive games.
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Interactive Music Games</h3>
              <p className="text-gray-600">
                Create engaging song trivia games and song guessing challenges. Let fans compete and have fun with music.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Share Music & Happiness</h3>
              <p className="text-gray-600">
                Share your favorite music through fun interactive music games. Create themed challenges that bring joy to your community.
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
            <h2 className="text-3xl font-bold mb-6 text-center">Connect & Earn Through Music Games</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Live Chat</h3>
                </div>
                <p className="text-gray-600">
                  Connect with your community during music game sessions. Share music and build lasting connections.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Music Game Variety</h3>
                </div>
                <p className="text-gray-600">
                  Keep your audience engaged with different music games and fun activities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Tips & Donations</h3>
                </div>
                <p className="text-gray-600">
                  Let fans support you through tips during music game sessions. Simple and straightforward.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Growth Analytics</h3>
                </div>
                <p className="text-gray-600">
                  Track engagement and grow your community. Simple metrics to help you improve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch A Music Game Room?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Create engaging music games, build your community, and start connecting with your audience through fun interactive games.
            </p>
            <Link
              href="https://bit.ly/hotlymusic"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Launch A Music Game Room
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
                <h3 className="text-xl font-semibold mb-2">Create Your Music Games</h3>
                <p className="text-gray-600">Sign up and create fun song trivia and song guessing games. Customize them to match your style.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Invite Your Audience</h3>
                <p className="text-gray-600">Share your music games with fans and friends. Let them join in and play together.</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Build Your Community</h3>
                <p className="text-gray-600">
                  Connect with players through chat and interactive features. Grow your music community through fun gameplay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Launch A Music Game Room?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of music engagement. Create your music game room today and start connecting with your audience through fun interactive music games.
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
