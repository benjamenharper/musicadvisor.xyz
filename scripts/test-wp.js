async function testWP() {
  const baseUrl = 'https://benh155.sg-host.com/wp-json/wp/v2';
  
  // Get categories
  console.log('Fetching categories...');
  const categoriesRes = await fetch(`${baseUrl}/categories`);
  const categories = await categoriesRes.json();
  console.log('Categories:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })));

  // Get all posts
  console.log('\nFetching all posts...');
  const postsRes = await fetch(`${baseUrl}/posts?_embed=1`);
  const posts = await postsRes.json();
  console.log('All posts:', posts.map(p => ({
    id: p.id,
    title: p.title.rendered,
    slug: p.slug,
    categories: p.categories,
    date: p.date
  })));

  // Get featured posts
  const featuredCategory = categories.find(c => c.slug === 'featured');
  if (featuredCategory) {
    console.log('\nFetching featured posts...');
    const featuredRes = await fetch(`${baseUrl}/posts?categories=${featuredCategory.id}&_embed=1`);
    const featuredPosts = await featuredRes.json();
    console.log('Featured posts:', featuredPosts.map(p => ({
      id: p.id,
      title: p.title.rendered,
      slug: p.slug,
      date: p.date
    })));
  }
}

testWP().catch(console.error);
