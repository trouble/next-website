import { Cell, Grid } from '@faceless-ui/css-grid';
import { BlockContainer } from '@root/layout/BlockContainer';
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss'
// import { Housing as HousingType, Post as PostType } from '';
// import { Person as PersonType } from '';
import qs from 'qs';
import { useRouter } from 'next/router';
import { ResultRow } from '@components/ResultRow';
import { Pagination } from '@components/Pagination';
import { PageRange } from '@components/PageRange';
import { ArchiveControls } from './ArchiveControls';
import { CollectionTypes, DocFromCMS, PostFromCMS } from '@root/cms/types';
import { dummyPosts } from '../../../public/dummyData/dummyPosts';
import { isUsingOfflineData } from '@root/utilities/isUsingOfflineData';

const perPage = 10;
const minLoadingTime = 1000; // require at least 1 second to load to give time for the scroll to finish

type Result = {
  totalDocs: number
  docs: (DocFromCMS | PostFromCMS)[]
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  nextPage: number
  prevPage: number
}

export type Props = {
  className?: string
  collection: CollectionTypes
  showPageRange?: boolean
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  showControls?: boolean
  controlsToShow?: {
    categories?: boolean // in relation to housing
    city?: boolean // in relation to housing
  }
  sort?: string
  showDates?: boolean
  showCategories?: boolean
}

const offlineMode = isUsingOfflineData();

export const CollectionArchive: React.FC<Props> = (props) => {
  const {
    className,
    collection,
    showPageRange,
    onResultChange,
    sort = '-createdAt',
    showControls,
    controlsToShow,
    showDates,
    showCategories,
  } = props;

  const [results, setResults] = useState<Result>({
    totalDocs: 0,
    docs: [],
    page: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 1,
    nextPage: 1
  });

  const {
    query: {  // contains both router AND search params
      category, // (router param)
      categories,
      city,
      page
    } = {},
  } = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef;
    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof page !== 'undefined') {
      scrollToRef();
    }
  }, [
    isLoading,
    scrollToRef,
    page
  ])

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (offlineMode) {
      setIsLoading(false);
      setResults(dummyPosts);
    } else {
      setIsLoading(true);
      // wait x ms before requesting new data, to give the illusion of load while the scrollTo finishes and to avoid loading flash when on fast networks
      timer = setTimeout(() => {
        const searchParams = qs.stringify({
          sort,
          where: {
            ...(categories || category) ? {
              'categories.slug': {
                in: [
                  categories,
                  category
                ].filter(Boolean)
              },
            } : {},
            ...city ? {
              'address.city': {
                like: city
              },
            } : {},
          },
          limit: perPage,
          page,
        }, { encode: false })

        const makeRequest = async () => {
          try {
            const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${collection}?${searchParams}`);
            const json = await req.json();

            const { docs } = json as { docs: DocFromCMS[] };
            if (docs && Array.isArray(docs)) {
              setResults(json)
              setIsLoading(false);
              if (typeof onResultChange === 'function') {
                onResultChange(json);
              }
            }
          } catch (err) {
            console.warn(err);
            setIsLoading(false);
            setError(JSON.stringify(err));
          }
        }

        makeRequest();
      }, minLoadingTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [
    page,
    city,
    categories,
    collection,
    onResultChange,
    sort,
    category
  ]);

  return (
    <div
      className={[
        classes.collectionArchive,
        className
      ].filter(Boolean).join(' ')}
    >
      <div
        ref={scrollRef}
        className={classes.scrollRef}
      />
      {showControls && (
        <ArchiveControls
          controlsToShow={controlsToShow}
          collection={collection}
        />
      )}
      {isLoading && (
        <BlockContainer>
          Loading, please wait...
        </BlockContainer>
      )}
      {error && (
        <BlockContainer>
          {error}
        </BlockContainer>
      )}
      {!isLoading && (
        <Fragment>
          {showPageRange !== false && (
            <BlockContainer>
              <Grid>
                <Cell
                  cols={6}
                  colsM={4}
                >
                  <div className={classes.pageRange}>
                    <PageRange
                      totalDocs={results.totalDocs}
                      currentPage={results.page}
                      collection={collection}
                      limit={perPage}
                    />
                  </div>
                </Cell>
              </Grid>
            </BlockContainer>
          )}
          <BlockContainer>
            <Grid className={classes.grid}>
              {results.docs?.map((result, index) => {
                // const isLast = index === results.docs.length - 1;
                return (
                  <ResultRow
                    key={index}
                    showCategories={showCategories}
                    showPublishedDate={showDates}
                    doc={{
                      ...result,
                      relationTo: collection
                    }}
                  />
                )
              })}
            </Grid>
          </BlockContainer>
          <BlockContainer className={classes.pagination}>
            <Pagination
              totalPages={results.totalPages}
              currentPage={results.page}
              useQueryParams
            />
          </BlockContainer>
        </Fragment>
      )
      }
    </div >
  )
}
