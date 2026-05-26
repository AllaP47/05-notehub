import React from 'react';
import ReactPaginateModule from 'react-paginate';


import cssStyles from './Pagination.module.css';
const css = cssStyles as Record<string, string>;

// @ts-expect-error - для сумісності з різними конфігураціями ESM/CJS
const ReactPaginate = (ReactPaginateModule.default || ReactPaginateModule) as unknown as React.ComponentType<Record<string, unknown>>;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      previousLabel="< Prev"
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
    />
  );
};


