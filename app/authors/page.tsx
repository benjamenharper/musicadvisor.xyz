'use client';

import Link from 'next/link';

export default function AuthorsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Authors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Conor Murphy */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <Link href="/conor-murphy.html" className="hover:text-indigo-600 transition-colors">
                Conor Murphy
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Music Industry Expert
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                artist development
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                digital marketing
              </span>
            </div>
            <Link
              href="/conor-murphy.html"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View Profile →
            </Link>
          </div>
        </div>
        
        {/* Angelica Peterson */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <Link href="/angelica-peterson.html" className="hover:text-indigo-600 transition-colors">
                Angelica Peterson
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Music Producer
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                music production
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                sound engineering
              </span>
            </div>
            <Link
              href="/angelica-peterson.html"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View Profile →
            </Link>
          </div>
        </div>
        
        {/* Mark Jackson */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <Link href="#" className="hover:text-indigo-600 transition-colors">
                Mark Jackson
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Music Marketing Specialist
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                marketing
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                social media
              </span>
            </div>
            <Link
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Coming Soon →
            </Link>
          </div>
        </div>
        
        {/* Alison Jenks */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              <Link href="#" className="hover:text-indigo-600 transition-colors">
                Alison Jenks
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">
              Music Business Consultant
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                business strategy
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                contracts
              </span>
            </div>
            <Link
              href="#"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Coming Soon →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
