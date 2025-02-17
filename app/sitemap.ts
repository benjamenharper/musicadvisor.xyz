import { MetadataRoute } from 'next';
import { fetchPosts, fetchCategories } from '@/lib/api';
import { config } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all categories
  const categories = await fetchCategories(config.defaultSite);
  
  // Get all posts
  const posts = await fetchPosts(config.defaultSite, '', { per_page: '100', _embed: 'true' });

  // Base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://musicadvisor.xyz';

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/virtual-music-room`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Add category pages
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Add post pages
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.modified),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...categoryRoutes, ...postRoutes];
}
