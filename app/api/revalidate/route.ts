import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Force revalidation of all pages
    revalidatePath('/', 'layout');
    revalidatePath('/posts', 'layout');
    
    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      message: 'Successfully revalidated all pages'
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json({
      revalidated: false,
      error: error.message,
      now: new Date().toISOString()
    }, { status: 500 });
  }
}
