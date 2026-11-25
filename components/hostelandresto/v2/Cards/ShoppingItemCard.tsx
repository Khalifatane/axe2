import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { VariantType, useSnackbar } from 'notistack';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { shoppingCartState } from 'atoms';
import { useRecoilState } from 'recoil';

import { BookProps } from 'const';
import { currencyFormat } from 'lib/utils';
import HalfRating from 'components/v2/Rating/HalfRating';

export default function ShoopingItemCard(props: BookProps) {
  const {
    id,
    title,
    type,
    price,
    averageRating = 0,
    ratings,
    stock,
  } = props;
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);

  const { enqueueSnackbar } = useSnackbar();

  const addItem = () => {
    setShoppingCart((oldShoppingCart) => {
      const existingItem = oldShoppingCart.find((i) => i.id === id);
      if (existingItem) {
        if (existingItem.quantity >= stock) {
          enqueueSnackbar(`Out of stock!`, { variant: 'error' });
          return [...oldShoppingCart];
        }
        const newItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        enqueueSnackbar(`"${title}" was successfully added.`, {
          variant: 'success',
        });
        return [...oldShoppingCart.filter((i) => i.id !== id), newItem];
      }
      enqueueSnackbar(`"${title}" was successfully added.`, {
        variant: 'success',
      });
      return [
        ...oldShoppingCart,
        {
          ...props,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <article className='catalog-card'>
      <NextLink href={`/book/${id}`} className='catalog-card-link'>
        <div className='catalog-card-image'>
          <Image
            src={`https://picsum.photos/seed/${id}/334/418`}
            alt={title}
            fill
            sizes='166px'
          />
        </div>
        <div className='catalog-card-content'>
          <h2>{title}</h2>
        </div>
      </NextLink>
      <div className='catalog-card-footer'>
        <div className='catalog-rating'>
          <span className='catalog-rating-score'>
            {averageRating ? averageRating.toFixed(1) : 'N/A'}
          </span>
          <span className='catalog-rating-count'>
            {ratings ? `(${ratings})` : 'Fair'}
          </span>
        </div>
        <div className='catalog-price'>
          <span>From</span>
          <strong>${currencyFormat(price)}</strong>
        </div>
        <button
          className='catalog-cart-button'
          onClick={addItem}
          aria-label={`Add ${title} to cart`}
        >
          <ShoppingCartIcon />
        </button>
      </div>
    </article>
  );
}
