import type { Metadata } from 'next';
import PrelineScript from '../components/lib/PrelineScript';
import './globals.css';

export const metadata: Metadata = { title: 'Preline Header and Footer' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<PrelineScript /></body>
    </html>
  );
}
