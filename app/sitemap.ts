import { MetadataRoute } from 'next';
import { fetchPosts, fetchCategories, fetchAuthors, fetchPages } from '@/lib/api';
import { config } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all dynamic content
  const categories = await fetchCategories(config.defaultSite);
  const posts = await fetchPosts(config.defaultSite, '', { per_page: '100', _embed: 'true' });
  const authors = await fetchAuthors(config.defaultSite);
  const pages = await fetchPages(config.defaultSite);

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
      url: `${baseUrl}/virtual-music-game-room`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-music`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
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
    {
      url: `${baseUrl}/hotly`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }
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

  // Add author pages
  const authorRoutes = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Add WordPress pages
  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/pages/${page.slug}`,
    lastModified: new Date(page.modified),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...routes,
    ...categoryRoutes,
    ...postRoutes,
    ...authorRoutes,
    ...pageRoutes,
  ];
}
