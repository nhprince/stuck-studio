import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL ?? 'https://stuckstudio.com'),
  title: {
    default: 'Stuck Studio | Digital Growth Agency — Web & Video',
    template: '%s | Stuck Studio',
  },
  description:
    'Stuck Studio is a digital growth agency specializing in web development, professional video editing, YouTube growth, and brand strategy — helping creators and businesses scale online.',
  keywords: [
    'digital agency Bangladesh',
    'web development Narayanganj',
    'video editing agency',
    'YouTube growth management',
    'thumbnail design',
    'social media content',
    'Next.js development',
    'stuck studio',
  ],
  authors: [{ name: 'Stuck Studio', url: 'https://stuckstudio.com' }],
  creator: 'Stuck Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stuckstudio.com',
    siteName: 'Stuck Studio',
    title: 'Stuck Studio | From Cut to Creativity',
    description:
      'Web development and cinematic video production that elevates brands and turns online attention into real business results.',
    images: [
      {
        url: '/og-image.jpg',          // Place a 1200×630 image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Stuck Studio — Digital Growth Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stuck Studio | From Cut to Creativity',
    description:
      'Web development and cinematic video production that elevates brands and turns attention into results.',
    site: '@stuckstudio',
    creator: '@stuckstudio',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://stuckstudio.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-zinc-950 text-zinc-50 font-sans antialiased selection:bg-red-600/30 selection:text-red-200"
      >
        {/* JSON-LD — Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Stuck Studio',
                url: 'https://stuckstudio.com',
                logo: 'https://stuckstudio.com/logo-generic.jpeg',
                description: 'Digital growth agency specializing in web development, video editing, and YouTube management.',
                sameAs: [
                  'https://linkedin.com/company/stuckstudio',
                  'https://youtube.com/@stuckstudio',
                  'https://x.com/stuckstudio',
                  'https://instagram.com/stuckstudio',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: 'Stuck Studio',
                image: 'https://stuckstudio.com/og-image.jpg',
                '@id': 'https://stuckstudio.com',
                url: 'https://stuckstudio.com',
                telephone: '+880-1967-385-336',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Narayanganj City',
                  addressLocality: 'Narayanganj',
                  addressRegion: 'Dhaka',
                  postalCode: '1400',
                  addressCountry: 'BD',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: 23.6238,
                  longitude: 90.5000,
                },
                openingHoursSpecification: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                serviceType: 'Web Engineering',
                provider: { '@type': 'LocalBusiness', name: 'Stuck Studio' },
                description: 'High-performance Next.js development and custom web platforms.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                serviceType: 'Video Production',
                provider: { '@type': 'LocalBusiness', name: 'Stuck Studio' },
                description: 'Cinematic video editing and brand storytelling.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Service',
                serviceType: 'YouTube Strategy',
                provider: { '@type': 'LocalBusiness', name: 'Stuck Studio' },
                description: 'Data-driven YouTube growth and channel management.',
              }
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
