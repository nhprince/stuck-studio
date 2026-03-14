import {
  BookOpen,
  ShoppingCart,
  Code2,
  TrendingUp,
  Film,
  Layers,
  LucideIcon
} from 'lucide-react';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  type: 'web' | 'video';
  icon: LucideIcon;
  stat: {
    value: string;
    label: string;
  };
  href?: string;
  previewImage?: string;
  videoSrc?: string;
  thumbnail?: string;
}

export interface ThumbnailItem {
  id: string;
  title: string;
  niche: string;
  image: string;
  ctr: string;
  style: string;
}

export const portfolio: PortfolioItem[] = [
  {
    id: 'smart-library-system',
    title: 'Smart Library System',
    category: 'Web Development',
    description: 'Comprehensive college library management system featuring student tracking, book inventory, fine calculation, and automated alerts. TRY IT NOW! Demo Credentials: admin / password123',
    tags: ['React', 'PHP', 'MySQL', 'Tailwind'],
    type: 'web',
    icon: BookOpen,
    stat: { value: '100%', label: 'Automated Alerts' },
    href: 'https://gssclibrary.nhprince.dpdns.org',
    previewImage: 'https://picsum.photos/id/24/800/600',
  },
  {
    id: 'modern-pos-software',
    title: 'Modern POS Software',
    category: 'Web Development',
    description: 'Fully functional modern POS software for Bangladeshi and global shops with real-time inventory, sales analytics, and multi-branch support.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    type: 'web',
    icon: ShoppingCart,
    stat: { value: 'Multi', label: 'Branch Support' },
    href: 'https://lenden.nhprince.dpdns.org',
    previewImage: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800&h=600',
  },
  {
    id: 'mh-creation-x',
    title: 'MH Creation X',
    category: 'Web Development',
    description: 'Full-stack studio management and portfolio platform — featuring project showcases, client management, and a custom admin panel built with a modern SPA architecture.',
    tags: ['React', 'Vite', 'PHP', 'Tailwind'],
    type: 'web',
    icon: Code2,
    stat: { value: 'Full', label: 'Stack App' },
    href: 'https://mhcreationx.top',
    previewImage: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80',
  },
  {
    id: 'social-hotspot',
    title: 'Social Hotspot: $100M Growth',
    category: 'Marketing Case Study',
    description: 'A high-impact documentary breaking down the exact strategies used to scale sales to $100M within a 90-day period.',
    tags: ['E-commerce', 'Growth', 'Marketing'],
    type: 'video',
    icon: TrendingUp,
    stat: { value: '$100M+', label: 'Generated' },
    videoSrc: '/videos/portfolio/socialhotspot.mp4',
    thumbnail: '/projects/social-hotspot.png',
  },
  {
    id: 'bangladesh-popularity',
    title: "Bangladesh's Rising Popularity",
    category: 'YouTube Content',
    description: "A deep-dive documentary exploring the key figures and cultural moments behind Bangladesh's growing global presence.",
    tags: ['Documentary', 'Storytelling', 'YouTube'],
    type: 'video',
    icon: Film,
    stat: { value: '50K+', label: 'Views' },
    videoSrc: '/videos/portfolio/bangladesh-popularity.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1614977645540-7abd88ba8e56?w=800&q=80',
  },
  {
    id: 'freelancing-vs-studying',
    title: 'Freelancing vs Studying',
    category: 'Educational',
    description: 'An engaging commentary video helping students decide between starting freelancing and continuing their studies in 2025.',
    tags: ['Commentary', 'CapCut', 'Premiere Pro'],
    type: 'video',
    icon: Layers,
    stat: { value: '80K+', label: 'Views' },
    videoSrc: '/videos/portfolio/freelancing-vs-studying.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
  },
];

export const thumbnails: ThumbnailItem[] = [
  { id: 'thumb-1', title: 'International Wedding Story', niche: 'Wedding & Vlog', image: '/projects/wedding-vlog.png', ctr: '14.2%', style: 'Cinematic Cinematic' },
  { id: 'thumb-2', title: 'Exploring the Baltic Sea', niche: 'Travel & Lifestyle', image: '/projects/baltic-sea-travel.png', ctr: '11.8%', style: 'Vibrant Outdoors' },
  { id: 'thumb-3', title: 'Day in Georgetown', niche: 'City Vlogs', image: '/projects/georgetown-vlog.jpg', ctr: '13.5%', style: 'Urban Adventure' },
  { id: 'thumb-4', title: 'Kolkata Secret Visit', niche: 'Travel Vlog', image: '/projects/kolkata-visit.jpeg', ctr: '15.7%', style: 'Mystery Hook' },
  { id: 'thumb-5', title: 'Triple Your Memory Power', niche: 'Education & Self-Help', image: '/projects/memory-techniques.jpeg', ctr: '17.3%', style: 'Bold Text Hook' },
  { id: 'thumb-6', title: 'Me & My Bike: Travel Series', niche: 'Adventure Travels', image: '/projects/bike-travel-series.jpeg', ctr: '14.9%', style: 'Profile Series' },
];
