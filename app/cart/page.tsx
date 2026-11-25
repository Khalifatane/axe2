import type { Metadata } from 'next';
import CartPage from '../../components/hostelandresto/CartPage';

export const metadata: Metadata = {
  title: 'Panier de réservation',
  description: 'Panier de réservation',
};

export default function CartRoute() {
  return <CartPage />;
}
