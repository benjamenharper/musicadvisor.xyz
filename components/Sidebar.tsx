'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement property alerts signup
    console.log('Property alerts signup:', email);
    setEmail('');
  };

  return (
    <aside className="space-y-8">
      {/* Property Alerts */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Property Alerts</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Get notified when new properties match your criteria. Never miss your dream home.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
          >
            Sign Up for Alerts
          </button>
        </form>
      </div>

      {/* Sell A Home */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Sell Your Home</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Get a comprehensive market analysis and maximize your home's value with our expert guidance.
        </p>
        <Link
          href="/real-estate/sell"
          className="block w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-center transition-colors"
        >
          Start Selling Process
        </Link>
      </div>

      {/* Buy A Home */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Buy A Home</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Let us help you find your perfect home. Access exclusive listings and personalized search.
        </p>
        <Link
          href="/real-estate/buy"
          className="block w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-md text-center transition-colors"
        >
          Start Home Search
        </Link>
      </div>
    </aside>
  );
}
