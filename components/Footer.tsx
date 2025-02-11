'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Site Info */}
        <div className="flex flex-col items-center text-center mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            MusicAdvisor
          </h3>
          <p className="text-sm text-gray-600">
            Helping Artists Thrive
          </p>
        </div>

        {/* Links */}
        <div className="flex justify-center mb-8">
          <a
            href="https://bit.ly/hotlymusic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-primary/90 transition-colors"
          >
            Visit Hotly.com
          </a>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex justify-center">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} MusicAdvisor. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
