import type { Metadata } from 'next';
import Providers from './providers';
import Header from '../components/sections/Header';
import MiniTestimonial from '../components/sections/MiniTestimonial';
import FinanceTicker from '../components/sections/FinanceTicker';
import './globals.css';
import './hostelandresto.css';

export const metadata: Metadata = {
  title: 'Preline Header and Footer',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <MiniTestimonial />
          <FinanceTicker />
          {children}
        </Providers>
      </body>
    </html>
  );
}
