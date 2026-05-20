import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from './lib/i18n';

export const metadata: Metadata = {
  title: 'Idriss Kriouile — DevOps · Test QA Manager · Tech Lead DevOps & QA',
  description:
    'Portfolio d\'Idriss Kriouile : DevOps Senior, Test QA Manager et Tech Lead. CI/CD, Kubernetes, GitOps, IaC, cloud et automatisation QA pour environnements bancaires. CV FR/EN/AR, bibliotheque technique et articles IA.',
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
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
