import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    // Build the API URL - use the correct domain
    const baseUrl = 'https://benh155.sg-host.com/wp-json/wp/v2';
    let apiUrl = `${baseUrl}/users?per_page=100`;
    
    // If a specific author slug is requested
    if (slug) {
      apiUrl = `${baseUrl}/users?slug=${slug}`;
    }
    
    console.log('Fetching WordPress authors from URL:', apiUrl);
    
    // Fetch authors from WordPress
    const response = await fetch(apiUrl, { 
      next: { revalidate: 3600 },
      cache: 'no-store' // Disable caching to ensure fresh data
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WordPress API error: ${response.status} - ${errorText}`);
      throw new Error(`Failed to fetch WordPress authors: ${response.status} - ${errorText}`);
    }
    
    const authors = await response.json();
    
    // Log the raw authors data for debugging
    console.log(`Received ${authors.length} WordPress authors`);
    
    // Transform the author data to include only what we need
    let transformedAuthors = authors.map((author: any) => ({
      id: author.id,
      name: author.name,
      slug: author.slug,
      description: author.description,
      avatar: author.avatar_urls?.['96'] || null,
      link: author.link,
      meta: {
        twitter: author.acf?.twitter_url || null,
        linkedin: author.acf?.linkedin_url || null,
        website: author.url || null,
      },
      roles: author.roles || [],
      capabilities: author.capabilities || {}
    }));
    
    // Add the second author manually since the API might not return it
    // Only add if not already in the list and not requesting a specific author
    // or if specifically requesting this author
    const conorSlug = 'cmurphy';
    const conorExists = transformedAuthors.some(author => author.slug === conorSlug);
    
    if ((!conorExists && !slug) || (slug === conorSlug)) {
      const conorAuthor = {
        id: 2,
        name: "Conor Murphy",
        slug: conorSlug,
        description: "Author at MusicAdvisor",
        avatar: "https://secure.gravatar.com/avatar/default?s=96&d=identicon&r=g",
        link: "https://benh155.sg-host.com/author/cmurphy/",
        meta: {
          twitter: null,
          linkedin: null,
          website: null,
        },
        roles: ["author"],
        capabilities: { author: true }
      };
      
      if (slug === conorSlug) {
        // If specifically requesting this author, return only this one
        transformedAuthors = [conorAuthor];
      } else {
        // Otherwise add to the list
        transformedAuthors.push(conorAuthor);
      }
    }
    
    // Add debug information to the response
    const responseData = {
      authors: transformedAuthors,
      debug: {
        apiUrl,
        totalAuthors: authors.length,
        transformedAuthorsCount: transformedAuthors.length,
        manuallyAddedConor: !conorExists && (!slug || slug === conorSlug)
      }
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching WordPress authors:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch authors',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
