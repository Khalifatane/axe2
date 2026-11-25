import * as React from 'react';

import { useRecoilState } from 'recoil';
import { homePageQueryState } from 'atoms';
import clsx from 'clsx';

import { OFFER_TYPE_VALUES, SORT_OPTIONS } from 'const';

export default function BookTypeMenu() {
  const [homePageQueryData, setHomePageQueryData] =
    useRecoilState(homePageQueryState);

  return (
    <>
      <ul
        tabIndex={0}
        className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
      >
        <li>
          <div className='menu-title'>{`Type d'offre`}</div>
          <ul>
            {OFFER_TYPE_VALUES.map((offerType) => (
              <li
                key={offerType}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    type: offerType,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData.type === offerType,
                  })}
                >
                  {offerType}
                </span>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <div className='menu-title'>Trier par</div>
          <ul>
            {SORT_OPTIONS.map((sortOption) => (
              <li
                key={sortOption.value}
                onClick={() => {
                  setHomePageQueryData({
                    ...homePageQueryData,
                    page: 1,
                    sort: sortOption.value,
                  });
                }}
              >
                <span
                  className={clsx({
                    active: homePageQueryData?.sort === sortOption.value,
                  })}
                >
                  {sortOption.label}
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
