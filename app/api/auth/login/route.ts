import { NextResponse } from 'next/server';
import { getWordPressAPI } from '@/lib/wordpress';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get the current site's API endpoint
    const apiUrl = getWordPressAPI('jwt-auth/v1/token');

    // Forward the login request to WordPress
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed');
    }

    // Set the JWT token in an HTTP-only cookie
    const cookieResponse = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    cookieResponse.cookies.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return cookieResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 }
    );
  }
}
