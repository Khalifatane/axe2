import * as React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  UserGroupIcon,
  WifiIcon,
  MinusIcon,
  PlusIcon,
  ShareIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

import { bookInfoQuery } from 'selectors';
import { BookDetailProps } from 'const';
import { currencyFormat, roundHalf } from 'lib/utils';
import BookInfoDialog from 'components/v2/BookDetails/BookInfoDialog';
import { shoppingCartState } from 'atoms';
import { useSnackbar } from 'notistack';

export default function BookInfoSection() {
  const [bookDetailsState, setBookDetailsState] = React.useState<
    BookDetailProps | undefined
  >();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const editBookDetailDialogRef = React.useRef<HTMLDialogElement>(null);
  const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartState);
  const { enqueueSnackbar } = useSnackbar();

  const bookDetailsLodable = useRecoilValueLoadable(bookInfoQuery);

  const handleUpdate = (data: BookDetailProps) => {
    setBookDetailsState(data);
  };

  const handleReserve = (data: BookDetailProps, availableStock: number) => {
    setShoppingCart((current) => {
      const existing = current.find((item) => item.id === data.id);
      if (existing) {
        if (existing.quantity >= availableStock) {
          enqueueSnackbar('Nombre de places disponible atteint.', { variant: 'error' });
          return current;
        }
        enqueueSnackbar(`"${data.title}" a été ajouté.`, { variant: 'success' });
        return current.map((item) =>
          item.id === data.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      enqueueSnackbar(`"${data.title}" a été ajouté.`, { variant: 'success' });
      return [
        ...current,
        {
          ...data,
          authors: [],
          averageRating: 5,
          ratings: 0,
          quantity,
        },
      ];
    });
  };

  switch (bookDetailsLodable.state) {
    case 'hasValue':
      const data = bookDetailsLodable.contents.content;
      const stock = bookDetailsState?.stock ?? data.stock;
      const detailType = data.type
        .replaceAll('_nbsp_', ' ')
        .replaceAll('_amp_', '&');
      const gallery = [0, 1, 2, 3].map(
        (index) => `https://picsum.photos/seed/${data.id}-${index}/900/620`
      );
      return (
        <>
          <div className='details-shell'>
            <nav className='details-breadcrumb' aria-label='Breadcrumb'>
              <NextLink href='/' className='back-link'>
                <ArrowLeftIcon />
              </NextLink>
              <NextLink href='/'>Search</NextLink>
              <span className='breadcrumb-separator'>›</span>
              <span className='breadcrumb-current'>Details</span>
            </nav>

            <div className='details-heading'>
              <div>
                <h1>{data.title}</h1>
                <p>
                  {detailType}
                  <span className='rating-star'>★</span>
                  <span className='rating-value'>{roundHalf(5)}</span>
                </p>
              </div>
              <div className='heading-actions'>
                <button aria-label='Share' className='icon-action'>
                  <ShareIcon />
                </button>
                <button
                  className='edit-details-button'
                  onClick={() => editBookDetailDialogRef.current?.showModal()}
                >
                  Edit Details
                </button>
                <button aria-label='More options' className='icon-action'>
                  <EllipsisHorizontalIcon />
                </button>
              </div>
            </div>

            <div className='details-layout'>
              <div className='gallery-column'>
                <div className='main-image'>
                  <Image
                    src={gallery[selectedImage]}
                    alt={data.title}
                    fill
                    sizes='(max-width: 760px) 100vw, 600px'
                    priority
                  />
                  <button className='view-button'>360° View</button>
                </div>
                <div className='thumbnail-row'>
                  {gallery.map((image, index) => (
                    <button
                      key={image}
                      className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt=''
                        fill
                        sizes='180px'
                      />
                    </button>
                  ))}
                </div>
              </div>

              <aside className='booking-card'>
                <div className='booking-row'>
                  <span>Category</span>
                  <strong>{detailType}</strong>
                </div>
                <div className='booking-row'>
                  <span>Personnes</span>
                  <div className='quantity-control'>
                    <button
                      aria-label='Decrease quantity'
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    >
                      <MinusIcon />
                    </button>
                    <strong>{quantity} personne</strong>
                    <button
                      aria-label='Increase quantity'
                      onClick={() =>
                        setQuantity((value) => Math.min(stock, value + 1))
                      }
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>
                <div className='booking-row'>
                  <span>Disponible depuis</span>
                  <strong>
                    {new Date(data.publishedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                </div>
                <div className='booking-row'>
                  <span>Disponibilité</span>
                  <strong>{stock} places disponibles</strong>
                </div>
                <div className='price-row'>
                  <span>Prix par personne</span>
                  <strong>${currencyFormat(data.price)}</strong>
                </div>
                <button
                  className='reserve-button'
                  onClick={() => handleReserve(data, stock)}
                >
                  Réserver
                </button>
              </aside>
            </div>

            <section className='property-about'>
              <h2>À propos</h2>
              <p>
                {data.title} est une offre de type {detailType.toLowerCase()}.
                Disponible depuis{' '}
                {new Date(data.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
                , cet établissement propose une expérience accueillante et
                adaptée aux voyageurs.
              </p>
            </section>

            <section className='property-facilities'>
              <h2>Équipements</h2>
              <div className='facility-list'>
                <div className='facility-item'>
                  <WifiIcon />
                  <span>Wi-Fi gratuit</span>
                </div>
                <div className='facility-item'>
                  <UserGroupIcon />
                  <span>2 chambres</span>
                </div>
                <div className='facility-item'>
                  <BuildingOffice2Icon />
                  <span>Parking</span>
                </div>
                <div className='facility-item'>
                  <AcademicCapIcon />
                  <span>Petit-déjeuner</span>
                </div>
              </div>
            </section>
          </div>

          {data && (
            <BookInfoDialog
              key={`${data.id}-${data.stock}`}
              id='edit_book_detail'
              ref={editBookDetailDialogRef}
              data={data}
              onSuccess={handleUpdate}
            />
          )}
        </>
      );
    case 'loading':
      return (
        <>
          <div className='flex items-center justify-center'>
            <span className='loading loading-bars loading-lg'></span>
          </div>
        </>
      );
    case 'hasError':
      throw bookDetailsLodable.contents;
  }
}
