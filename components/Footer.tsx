'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { config } from '@/lib/config';
import { Instagram, MessageSquare } from 'lucide-react';

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

        {/* Social Links */}
        <div className="flex justify-center mb-8 space-x-6">
          <a 
            href="https://discord.gg/5tqCqTqbsc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Join our Discord server"
          >
            <MessageSquare className="w-6 h-6" />
          </a>
          <a 
            href="https://www.instagram.com/musicadvisor.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="w-6 h-6" />
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
