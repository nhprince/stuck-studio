import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Stuck Studio',
    short_name: 'Stuck Studio',
    description: 'Digital growth agency specializing in web development and cinematic video production.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#ef4444',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
