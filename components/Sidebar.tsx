'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Music Industry Updates</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Stay updated with the latest music industry news, promotion tips, and success stories.
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
            Subscribe to Newsletter
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <nav className="space-y-2">
          <Link
            href="/category/music-promotion"
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            Music Promotion Tips
          </Link>
          <Link
            href="/category/industry-news"
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            Industry News
          </Link>
          <Link
            href="/category/artist-stories"
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            Artist Success Stories
          </Link>
          <Link
            href="/category/marketing"
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            Music Marketing
          </Link>
          <Link
            href="/category/ai-music"
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            AI Music
          </Link>
        </nav>
      </div>
    </aside>
  );
}
