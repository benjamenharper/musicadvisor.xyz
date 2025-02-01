import React from 'react';

export default function PropertyManagementPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-6">Property Management Services</h1>
        
        <div className="prose max-w-none">
          <p className="text-xl mb-8">
            Professional property management services for Hawaii homeowners. We handle everything so you don't have to.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tenant screening and placement</li>
                <li>Rent collection and disbursement</li>
                <li>Property maintenance</li>
                <li>Financial reporting</li>
                <li>24/7 emergency response</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Benefits</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maximize rental income</li>
                <li>Reduce vacancy rates</li>
                <li>Lower maintenance costs</li>
                <li>Ensure legal compliance</li>
                <li>Peace of mind</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Our Management Process</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">1. Property Marketing</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Professional photography</li>
                <li>Listing on major rental platforms</li>
                <li>Social media promotion</li>
                <li>Property showings</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">2. Tenant Management</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Thorough screening process</li>
                <li>Lease preparation and signing</li>
                <li>Move-in/move-out inspections</li>
                <li>Security deposit handling</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">3. Property Maintenance</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Regular inspections</li>
                <li>Preventive maintenance</li>
                <li>Emergency repairs</li>
                <li>Vendor management</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">4. Financial Management</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Rent collection</li>
                <li>Monthly financial statements</li>
                <li>Year-end tax documentation</li>
                <li>Budget planning</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="mb-4">
              Contact us today to learn how we can help manage your property.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
