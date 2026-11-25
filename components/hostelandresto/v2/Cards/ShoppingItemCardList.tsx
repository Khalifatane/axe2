import * as React from 'react';

import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import ShoopingItemCard from 'components/v2/Cards/ShoppingItemCard';
import { homePageBookSumState } from 'atoms';
import { homePageQuery } from 'selectors';
import TravelPromoRow from 'components/v2/Promos/TravelPromoRow';

export interface BookListProps {
  page: number;
  pageSize: number;
}

export default function BookList(props: BookListProps) {
  const { page, pageSize } = props;
  const bookListLoadable = useRecoilValueLoadable(homePageQuery);
  const [homePageBookSum, setHomePageBookSum] = useRecoilState(homePageBookSumState);
  switch (bookListLoadable.state) {
    case 'hasValue':
      setHomePageBookSum(bookListLoadable.contents.total);
      return (
        <>
          <TravelPromoRow />
          {!!homePageBookSum && (
            <div className='text-sm text-gray-500 pb-4'>{`${
              pageSize * (page - 1) + 1
            } ~ ${
              pageSize * page > homePageBookSum
                ? homePageBookSum
                : pageSize * page
            } of over ${homePageBookSum} results`}</div>
          )}
          <div className='catalog-grid'>
            {bookListLoadable.contents?.content?.map((book) => (
              <ShoopingItemCard key={book.id} {...book} />
            ))}
          </div>
        </>
      );
    case 'loading':
      return (
        <div className='flex items-center justify-center'>
          <span className='loading loading-bars loading-lg'></span>
        </div>
      );
    case 'hasError':
      throw bookListLoadable.contents;
  }
}
