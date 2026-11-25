'use client';

import ShoppingCartList from './v2/List/ShoppingCartList';

export default function CartPage() {
  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Panier de réservation</h1>
      <ShoppingCartList />
    </main>
  );
}
