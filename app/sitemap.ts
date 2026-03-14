import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-03-14T00:15:05.830Z');

  return [
    // Main pages
    {
      url: 'https://stuckstudio.com/',
      lastModified: lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Portfolio projects
    {
      url: 'https://stuckstudio.com/projects/social-hotspot',
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://stuckstudio.com/projects/bangladesh-popularity',
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://stuckstudio.com/projects/freelancing-vs-studying',
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // Legal
    {
      url: 'https://stuckstudio.com/privacy-policy',
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://stuckstudio.com/terms',
      lastModified: lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
