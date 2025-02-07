'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send } from 'lucide-react';

const serviceOptions = {
  marketing: {
    title: 'Music Marketing Inquiry',
    description: 'Get started with our targeted music marketing services',
    defaultMessage: 'I\'m interested in your music marketing services. I would like to learn more about:'
  },
  distribution: {
    title: 'Music Distribution Inquiry',
    description: 'Start distributing your music to major platforms',
    defaultMessage: 'I\'m interested in your music distribution services. I would like to learn more about:'
  },
  default: {
    title: 'Contact Us',
    description: 'Get in touch with our team',
    defaultMessage: 'Hello, I would like to inquire about your services.'
  }
};

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const service = searchParams.get('service');
    if (service && serviceOptions[service as keyof typeof serviceOptions]) {
      setFormData(prev => ({
        ...prev,
        service: service,
        message: serviceOptions[service as keyof typeof serviceOptions].defaultMessage
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const service = formData.service || 'default';
  const { title, description } = serviceOptions[service as keyof typeof serviceOptions] || serviceOptions.default;

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 border rounded-md bg-background"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border rounded-md bg-background"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium mb-2">
                Service
              </label>
              <select
                id="service"
                className="w-full px-4 py-2 border rounded-md bg-background"
                value={formData.service}
                onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
              >
                <option value="">Select a service</option>
                <option value="marketing">Music Marketing</option>
                <option value="distribution">Music Distribution</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                className="w-full px-4 py-2 border rounded-md bg-background"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-800 rounded-md">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-800 rounded-md">
                Sorry, there was an error sending your message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
