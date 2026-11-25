import * as React from 'react';
import Image from 'next/image';
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function TravelPromoRow() {
  return (
    <section
      className='travel-promo-row'
      aria-label='Explore and travel deals'
    >
      <article
        className='travel-promo-card explore-promo'
        aria-label='Explore Seoul'
      >
        <Image
          className='travel-promo-image'
          src='https://picsum.photos/seed/seoul/696/570'
          alt='Seoul landscape'
          fill
          priority
          sizes='348px'
        />
        <div className='explore-promo-shade' />
        <div className='explore-promo-content'>
          <h2>Explore our<br />Seoul</h2>
          <p>890 hotels, 345 local flights and<br />234 bus providers</p>
        </div>
        <button type='button' className='explore-promo-button'>
          Explore
          <ArrowRightIcon />
        </button>
      </article>

      <article
        className='travel-promo-card deal-promo'
        aria-label='Cuba deal'
      >
        <Image
          className='travel-promo-image'
          src='https://picsum.photos/seed/cuba/502/570'
          alt='Cuba holiday destination'
          fill
          sizes='251px'
        />
        <div className='deal-promo-shade' />
        <span className='deal-badge'>Up to 50% off</span>
        <div className='deal-promo-content'>
          <MapPinIcon className='deal-pin-icon' />
          <h2>CUBA</h2>
          <div className='deal-promo-bottom'>
            <p>
              <strong>1-14</strong>
              <span>
                <CalendarDaysIcon />
                Flight + 4 nights
              </span>
            </p>
            <strong className='deal-price'>$350</strong>
          </div>
        </div>
      </article>

      <article
        className='travel-promo-card deal-promo deal-promo-alt'
        aria-label='Cuba deal'
      >
        <Image
          className='travel-promo-image'
          src='https://picsum.photos/seed/cuba-coast/502/570'
          alt='Cuba coast'
          fill
          sizes='251px'
        />
        <div className='deal-promo-shade' />
        <span className='deal-badge'>Up to 50% off</span>
        <div className='deal-promo-content'>
          <MapPinIcon className='deal-pin-icon' />
          <h2>CUBA</h2>
          <div className='deal-promo-bottom'>
            <p>
              <strong>1-14</strong>
              <span>
                <CalendarDaysIcon />
                Flight + 4 nights
              </span>
            </p>
            <strong className='deal-price'>$350</strong>
          </div>
        </div>
      </article>
    </section>
  );
}
