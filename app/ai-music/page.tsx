'use client';

import { useState } from 'react';
import { Music, Loader2 } from 'lucide-react';

export default function AIMusicPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [error, setError] = useState('');

  const generateMusic = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate music');
      }

      const data = await response.json();
      setAudioUrl(data.audioUrl);
    } catch (err) {
      setError('Failed to generate music. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Music Generator</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Describe the kind of music you want to create and let AI do the magic
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            Describe your music
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A relaxing piano melody with soft ambient sounds..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
            rows={4}
          />
        </div>

        <button
          onClick={generateMusic}
          disabled={isGenerating || !prompt}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Music className="w-5 h-5" />
              <span>Generate Music</span>
            </>
          )}
        </button>

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        {audioUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your Generated Music</h2>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}
