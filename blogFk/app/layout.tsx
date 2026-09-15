import './globals.css';
import type { Metadata } from 'next';
import { Inter, Oswald, JetBrains_Mono, Caveat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import BackToTop from '@/components/layout/back-to-top';
import ScrollProgress from '@/components/layout/scroll-progress';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-hand', display: 'swap' });

export const metadata: Metadata = {
  title: 'FKOKO — Real Rides. Real Progress.',
  description: 'XC cycling blog, training journal, and race diary by FKoko. Training, bikes, races, gear and everything in between.',
  keywords: ['cycling', 'XC', 'mountain bike', 'training', 'races', 'bike build', 'cyclist blog'],
  authors: [{ name: 'FKoko' }],
  openGraph: {
    title: 'FKOKO — Real Rides. Real Progress.',
    description: 'XC cycling blog, training journal, and race diary by FKoko.',
    type: 'website',
    siteName: 'FKOKO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FKOKO — Real Rides. Real Progress.',
    description: 'XC cycling blog, training journal, and race diary by FKoko.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${oswald.variable} ${jetbrainsMono.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
