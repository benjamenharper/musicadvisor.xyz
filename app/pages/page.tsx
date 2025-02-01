'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';

interface WordPressPage {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  link: string;
}

interface PagesClientProps {
  initialPages: WordPressPage[];
}

export const dynamic = 'force-static';

export default function PagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Pages</h1>
      <div className="grid gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
          <p className="text-muted-foreground">
            Our pages are currently being updated. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
