import { ArrowButton } from '@components/ArrowButton';
import { Hyperlink } from '@components/Hyperlink';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback } from 'react';
import classes from './index.module.scss';

export const Pagination: React.FC<{
  className?: string
  totalPages?: number
  currentPage?: number
  prevHref?: string
  nextHref?: string
  useQueryParams?: boolean
  onClick?: (page: number) => void // eslint-disable-line no-unused-vars
}> = (props) => {
  const {
    className,
    currentPage = 1,
    totalPages = 1,
    prevHref,
    nextHref,
    useQueryParams,
    onClick
  } = props;

  const router = useRouter();

  const prevPage = currentPage - 1 < 0 ? undefined : currentPage - 1;
  const nextPage = currentPage + 1 > totalPages ? undefined : currentPage + 1;

  const setPageParam = useCallback((page: number) => {
    router.push(
      {
        query: {
          ...router.query,
          page
        },
      },
      undefined,
      { shallow: true }
    );
  }, [router])

  return (
    <div
      className={[
        classes.pagination,
        className
      ].filter(Boolean).join(' ')}
    >
      {!useQueryParams && (
        <Fragment>
          {prevHref ? (
            <Hyperlink
              href={prevHref}
              className={classes.hyperlink}
            >
              <ArrowButton
                direction="left"
                htmlElement="span"
              />
            </Hyperlink>
          ) : (
            <ArrowButton
              direction="left"
              htmlElement="span"
              onClick={() => {
                if (prevPage !== undefined && typeof onClick === 'function') {
                  onClick(prevPage)
                }
              }}
              disabled={!prevPage}
            />
          )}
        </Fragment>
      )}
      {useQueryParams && (
        <Fragment>
          {prevPage !== undefined ? (
            <ArrowButton
              direction="left"
              onClick={() => {
                if (useQueryParams) {
                  setPageParam(prevPage);
                }
              }}
            />
          ) : (
            <ArrowButton
              direction="left"
              htmlElement="span"
              disabled
            />
          )}
        </Fragment>
      )}
      <div className={classes.content}>
        {typeof currentPage !== undefined && (
          <div>
            {currentPage}
          </div>
        )}
        {typeof currentPage !== undefined && typeof totalPages !== undefined && (
          <div className={classes.divider}>
            /
          </div>
        )}
        {typeof totalPages !== undefined && (
          <div>
            {totalPages}
          </div>
        )}
      </div>
      {!useQueryParams && (
        <Fragment>
          {nextHref ? (
            <Hyperlink
              href={nextHref}
              className={classes.hyperlink}
            >
              <ArrowButton htmlElement="span" />
            </Hyperlink>
          ) : (
            <ArrowButton
              htmlElement="span"
              onClick={() => {
                if (nextPage !== undefined && typeof onClick === 'function') {
                  onClick(nextPage)
                }
              }}
              disabled={!nextPage}
            />
          )}
        </Fragment>
      )}
      {useQueryParams && (
        <Fragment>
          {nextPage !== undefined ? (
            <ArrowButton
              onClick={() => {
                if (useQueryParams) {
                  setPageParam(nextPage);
                }
              }}
            />
          ) : (
            <ArrowButton
              htmlElement="span"
              disabled
            />
          )}
        </Fragment>
      )}
    </div>
  )
}
