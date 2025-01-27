import { NextResponse } from 'next/server';

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  // If not JSON, get the text and create an error message
  const text = await response.text();
  throw new Error('Invalid response from server');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Get the WordPress API endpoint
    const wpUrl = process.env.WORDPRESS_URL || '';
    const apiUrl = `${wpUrl}/wp-json/newsletter/v1/subscribe`;

    // Make the subscription request to WordPress
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': process.env.WORDPRESS_API_NONCE || '',
      },
      body: JSON.stringify({
        email,
        list: 'default', // You can make this configurable if needed
        source: 'website',
      }),
    });

    try {
      const data = await parseResponse(response);
      
      if (!response.ok) {
        if (data.code === 'already_subscribed') {
          return NextResponse.json(
            { message: 'You are already subscribed to our newsletter!' },
            { status: 400 }
          );
        }
        throw new Error(data.message || 'Failed to subscribe');
      }

      return NextResponse.json({
        message: 'Successfully subscribed to the newsletter!',
        data,
      });
    } catch (parseError) {
      console.error('Error parsing response:', parseError);
      throw new Error('Invalid response from newsletter service');
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { 
        message: error instanceof Error 
          ? error.message 
          : 'Failed to process subscription. Please try again later.'
      },
      { status: 500 }
    );
  }
}
