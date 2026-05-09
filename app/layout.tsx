import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Idriss Kriouile — Tech Entrepreneur & Full-Stack Developer',
  description:
    'Portfolio of Idriss Kriouile (SallyStar) — Founder & Developer. Mobile games, distributed systems, and product engineering. Full-stack TypeScript, NestJS, React Native, AWS, Cloudflare.',
  keywords: [
    'Idriss Kriouile',
    'SallyStar',
    'SallyCards',
    'Software Engineer',
    'Full-Stack Developer',
    'Mobile Games',
    'TypeScript',
    'NestJS',
    'React Native',
    'Next.js',
    'Maroc',
    'Morocco',
  ],
  authors: [{ name: 'Idriss Kriouile', url: 'https://salistar.com' }],
  creator: 'Idriss Kriouile',
  metadataBase: new URL('https://salistar.com'),
  openGraph: {
    title: 'Idriss Kriouile — Tech Entrepreneur & Full-Stack Developer',
    description: 'Building digital products from the ground up. SallyCards, SallyRecruit, Sallyescapegeo and more.',
    url: 'https://salistar.com',
    siteName: 'Idriss Kriouile · SallyStar',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idriss Kriouile — Tech Entrepreneur',
    description: 'Founder of SallyStar. Mobile games, distributed systems, and product engineering.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
