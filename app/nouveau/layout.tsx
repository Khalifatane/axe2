import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saint-Louis | Field Atlas',
  description: 'Explore the districts of Saint-Louis, Senegal.',
};

export default function NouveauLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}