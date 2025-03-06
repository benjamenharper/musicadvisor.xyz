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
  
  // Current date for static pages
  const currentDate = new Date();
  
  // Static routes - core pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/virtual-music-game-room`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai-music`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hotly`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ];

  // Add category pages
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Add post pages
  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Add author pages
  const authorRoutes = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  // Add WordPress pages
  const pageRoutes = pages.map((page) => ({
    url: `${baseUrl}/pages/${page.slug}`,
    lastModified: new Date(page.modified || page.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Combine all routes
  const allRoutes = [
    ...routes,
    ...categoryRoutes,
    ...postRoutes,
    ...authorRoutes,
    ...pageRoutes,
  ];

  // Remove any duplicate URLs
  const uniqueUrls = new Set();
  const uniqueRoutes = allRoutes.filter(route => {
    if (uniqueUrls.has(route.url)) {
      return false;
    }
    uniqueUrls.add(route.url);
    return true;
  });

  return uniqueRoutes;
}
