import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { MessageSquare, Users, Share2, Headphones, Music, Zap, Instagram } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Join Our Music Community',
  description: 'Connect with fellow musicians, producers, and industry experts in our vibrant music community. Share your music, get feedback, and grow together.',
  keywords: ['music community', 'musician network', 'music collaboration', 'artist community', 'music feedback', 'discord', 'instagram'],
  openGraph: {
    title: 'Join Our Music Community | MusicAdvisor.xyz',
    description: 'Connect with fellow musicians, producers, and industry experts in our vibrant music community.',
    images: [
      {
        url: '/musicianscropped.png',
        width: 1200,
        height: 630,
        alt: 'MusicAdvisor Community'
      }
    ]
  }
};

export default function CommunityPage() {
  return (
    <main className="bg-background">
      {/* Community Banner */}
      <section className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 text-white py-10 mb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-indigo-200 mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold">Join Our Community</h1>
            </div>
            <p className="text-xl md:text-2xl text-indigo-100 mb-3">
              Connect, Collaborate, and Grow Together
            </p>
            <p className="text-lg text-indigo-200 mb-5">
              A supportive network of musicians, producers, and industry experts
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a 
                href="https://discord.gg/5tqCqTqbsc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 text-lg font-medium rounded-full hover:bg-indigo-100 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Join Discord
              </a>
              <a 
                href="https://www.instagram.com/musicadvisor.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-white text-purple-600 text-lg font-medium rounded-full hover:bg-purple-100 transition-colors"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Community Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Music Community</h2>
          <div className="prose prose-lg mx-auto">
            <p>
              We're building a thriving music community where musicians, producers, and industry professionals 
              come together to share knowledge, get feedback, and build meaningful connections.
            </p>
            <p>
              Whether you're just starting your musical journey or you're an established artist looking 
              to network, our community offers a supportive space to grow your career and craft.
            </p>
          </div>
          
          {/* Social Platforms */}
          <div className="mt-10 mb-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Community is Live!</h3>
            <p className="text-lg text-gray-600 mb-6">
              Join our active communities on Discord and Instagram to connect with fellow artists, share your music, and stay updated with the latest resources.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Discord */}
              <a 
                href="https://discord.gg/5tqCqTqbsc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-4">
                  <MessageSquare className="w-10 h-10 text-indigo-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Join Our Discord</h4>
                <p className="text-gray-600 text-center mb-4">
                  Chat with other musicians, share your work, and get real-time feedback and support.
                </p>
                <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors">
                  Join Discord Server
                </span>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/musicadvisor.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <div className="bg-purple-100 p-4 rounded-full mb-4">
                  <Instagram className="w-10 h-10 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Follow on Instagram</h4>
                <p className="text-gray-600 text-center mb-4">
                  Get inspired by visual content, success stories, and behind-the-scenes from our community.
                </p>
                <span className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-medium rounded-full hover:bg-purple-700 transition-colors">
                  Follow @musicadvisor.xyz
                </span>
              </a>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-lg text-gray-600">
              Our community is growing every day! Join our Discord server and Instagram page to connect with other artists and influencers.
            </p>
          </div>
        </section>

        {/* Community Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Join Our Community?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Share2 className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Share Your Music</h3>
              </div>
              <p className="text-gray-600">
                Get your music heard by fellow artists and receive constructive feedback to help you improve and refine your sound.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Network & Collaborate</h3>
              </div>
              <p className="text-gray-600">
                Connect with like-minded musicians, producers, and industry professionals. Find your next collaborator or mentor.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Headphones className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Exclusive Content</h3>
              </div>
              <p className="text-gray-600">
                Access exclusive tutorials, resources, and insights from industry experts that aren't available anywhere else.
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Music className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Music Challenges</h3>
              </div>
              <p className="text-gray-600">
                Participate in regular music challenges and competitions to push your creative boundaries and showcase your talent.
              </p>
            </div>
            
            {/* Benefit 5 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Growth Opportunities</h3>
              </div>
              <p className="text-gray-600">
                Discover opportunities for playlist placements, collaborations, and exposure to help grow your audience and career.
              </p>
            </div>
            
            {/* Benefit 6 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Supportive Community</h3>
              </div>
              <p className="text-gray-600">
                Join a positive, encouraging community that celebrates your wins and helps you overcome challenges in your music journey.
              </p>
            </div>
          </div>
        </section>

        {/* Community Values */}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Community Values</h2>
          <div className="prose prose-lg">
            <p>
              Our community thrives on mutual respect, constructive feedback, and positive interactions. 
              We're committed to maintaining a welcoming environment for all members.
            </p>
            <ul>
              <li>Be respectful and supportive of other community members</li>
              <li>Provide constructive feedback when asked</li>
              <li>Share knowledge and resources generously</li>
              <li>Respect copyright and intellectual property</li>
              <li>Celebrate diversity and inclusion</li>
              <li>Focus on growth and continuous improvement</li>
            </ul>
          </div>
        </section>

        {/* Join Now Section */}
        <section className="text-center bg-indigo-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community Today!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our community is live and growing! Connect with fellow artists and influencers on Discord and Instagram.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://discord.gg/5tqCqTqbsc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-full hover:bg-indigo-700 transition-colors"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Join Discord
            </a>
            <a 
              href="https://www.instagram.com/musicadvisor.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-purple-600 text-white text-lg font-medium rounded-full hover:bg-purple-700 transition-colors"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Follow on Instagram
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
