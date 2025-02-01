import React from 'react';

export default function InvestmentPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Investment Properties in Hawaii</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl mb-8">
            Discover lucrative investment opportunities in Hawaii's real estate market. Our expertise helps you make informed investment decisions.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Investment Types</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Vacation rentals</li>
                <li>Long-term rentals</li>
                <li>Commercial properties</li>
                <li>Multi-family units</li>
                <li>Development opportunities</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Market analysis and research</li>
                <li>ROI calculations</li>
                <li>Property acquisition</li>
                <li>Portfolio management</li>
                <li>Investment strategy</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Why Invest in Hawaii?</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Strong Market Growth</h3>
              <p>Hawaii's real estate market has shown consistent appreciation over the years, making it an attractive option for long-term investment.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Tourism-Driven Economy</h3>
              <p>Hawaii's thriving tourism industry creates high demand for vacation rentals and investment properties.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Limited Supply</h3>
              <p>The islands' limited land availability helps maintain property values and creates potential for appreciation.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Diverse Opportunities</h3>
              <p>From beachfront condos to urban developments, Hawaii offers various investment opportunities to suit different strategies.</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Investment Process</h2>
          <ol className="list-decimal pl-6 space-y-4 mb-8">
            <li>
              <strong>Initial Consultation</strong>
              <p>We'll discuss your investment goals, budget, and preferred strategy.</p>
            </li>
            <li>
              <strong>Market Analysis</strong>
              <p>We'll provide detailed market research and potential investment opportunities.</p>
            </li>
            <li>
              <strong>Property Selection</strong>
              <p>We'll help you identify and evaluate properties that match your criteria.</p>
            </li>
            <li>
              <strong>Due Diligence</strong>
              <p>We'll assist with property inspections, financial analysis, and legal review.</p>
            </li>
            <li>
              <strong>Acquisition</strong>
              <p>We'll help negotiate and close the deal on your chosen property.</p>
            </li>
            <li>
              <strong>Management</strong>
              <p>We can provide ongoing property management services if needed.</p>
            </li>
          </ol>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Start Investing Today</h2>
            <p className="mb-4">
              Contact us to explore investment opportunities in Hawaii's real estate market.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
