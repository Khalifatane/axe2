'use client';

import { useState } from 'react';

const links = [
  { href: '/', label: 'Landing' },
  { href: '/catalog', label: 'All offers' },
  { href: '/hostel', label: 'Hostel' },
  { href: '/resto', label: 'Resto' },
  { href: '/cart', label: 'Cart' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-blue-600 text-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 sm:px-6 lg:px-8" aria-label="Main navigation">
        <a className="text-xl font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600" href="/" aria-label="Brand home">Brand</a>
        <button type="button" className="inline-flex size-10 items-center justify-center rounded-lg border border-white/40 md:hidden" aria-expanded={isOpen} aria-controls="site-navigation" aria-label="Toggle navigation" onClick={() => setIsOpen((open) => !open)}>
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={isOpen ? 'm6 6 12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
        </button>
        <div id="site-navigation" className={`${isOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pt-3 md:flex md:w-auto md:flex-row md:items-center md:gap-2 md:pt-0`}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              {link.label}
            </a>
          ))}
          <a href="#blog" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">Blog</a>
          <a href="#login" onClick={() => setIsOpen(false)} className="rounded-lg border border-white/45 px-3 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-white">Log in</a>
        </div>
      </nav>
    </header>
  );
}
