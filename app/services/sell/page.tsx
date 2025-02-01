import React from 'react';

export default function SellPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Sell Your Hawaii Property</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl mb-8">
            Get the best value for your property with our expert guidance and marketing strategies.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Why Sell With Us?</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expert market knowledge</li>
                <li>Professional photography</li>
                <li>Strategic pricing</li>
                <li>Wide marketing reach</li>
                <li>Skilled negotiation</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Our Marketing Includes</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Professional photos and virtual tours</li>
                <li>Featured listings on major platforms</li>
                <li>Social media promotion</li>
                <li>Email marketing campaigns</li>
                <li>Open house events</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">The Selling Process</h2>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Property Evaluation</strong>
              <p>We'll analyze your property and provide a detailed market analysis.</p>
            </li>
            <li>
              <strong>Preparation</strong>
              <p>We'll help you prepare your property for sale with staging advice and improvements.</p>
            </li>
            <li>
              <strong>Marketing</strong>
              <p>We'll implement our comprehensive marketing strategy to attract qualified buyers.</p>
            </li>
            <li>
              <strong>Showings</strong>
              <p>We'll coordinate and conduct property showings and open houses.</p>
            </li>
            <li>
              <strong>Negotiation</strong>
              <p>We'll negotiate offers to get you the best possible terms.</p>
            </li>
            <li>
              <strong>Closing</strong>
              <p>We'll manage the closing process to ensure a smooth transaction.</p>
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
            <p className="mb-4">
              Contact us for a free property valuation and consultation.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Request Valuation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
