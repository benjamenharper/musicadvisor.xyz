import React from 'react';

export default function BuyPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Buy a Home in Hawaii</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl mb-8">
            Find your dream home in paradise. We'll guide you through every step of the home buying process.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Why Buy in Hawaii?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Year-round tropical climate</li>
                <li>Strong real estate market</li>
                <li>Diverse property options</li>
                <li>World-class amenities</li>
                <li>Rich cultural heritage</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Our Services Include</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Property search assistance</li>
                <li>Market analysis and valuations</li>
                <li>Negotiation support</li>
                <li>Mortgage guidance</li>
                <li>Closing coordination</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">The Buying Process</h2>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Initial Consultation</strong>
              <p>We'll discuss your needs, preferences, and budget to understand exactly what you're looking for.</p>
            </li>
            <li>
              <strong>Property Search</strong>
              <p>We'll help you find properties that match your criteria and arrange viewings.</p>
            </li>
            <li>
              <strong>Making an Offer</strong>
              <p>Once you find the right property, we'll help you make a competitive offer.</p>
            </li>
            <li>
              <strong>Due Diligence</strong>
              <p>We'll guide you through inspections, appraisals, and other necessary steps.</p>
            </li>
            <li>
              <strong>Closing</strong>
              <p>We'll coordinate with all parties to ensure a smooth closing process.</p>
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Ready to Start?</h2>
            <p className="mb-4">
              Contact us today to begin your journey to homeownership in Hawaii.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
