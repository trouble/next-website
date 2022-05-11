import qs from 'qs';
import { Hyperlink } from '@components/Hyperlink';
import { Modal, useModal } from '@faceless-ui/modal';
import React, { ChangeEvent, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { BlockContainer } from '../BlockContainer';
import useDebounce from '@root/utilities/useDebounce';
import classes from './index.module.scss';
import { Grid } from '@faceless-ui/css-grid';
import { Button } from '@components/Button';
import { ResultRow } from '@components/ResultRow';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { Pagination } from '@components/Pagination';
import { PageRange } from '@components/PageRange';
import { useRouter } from 'next/router';
import { CloseIcon } from '@root/icons/CloseIcon';
import { useGlobals } from '@root/providers/Globals';
import { formatSlug } from '@root/utilities/formatSlug';
import { CollectionTypes, DocFromCMS } from '@root/cms/types';
import { Meta } from 'payload-plugin-seo/dist/types';
// import { Search as SearchType } from 'payload-plugin-search/dist/types';

type SearchType = { // TODO: type this from plugin
  meta: Meta
  doc: DocFromCMS & {
    relationTo: CollectionTypes
  }
};

const minValueLength = 3;

type Props = {
  popularSearchTerms: {
    term: string
  }[]
}

const perPage = 10;

export const SearchModal: React.FC<Props> = ({ popularSearchTerms }) => {
  const { currentModal } = useModal();
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any>();
  const debouncedValue = useDebounce(value, 200);
  const inputRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    meta: {
      contactPage
    } = {}
  } = useGlobals();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  }, [])

  // if user updates input while on page > 1, reset results to page 1
  useEffect(() => {
    setPage(1);
  }, [debouncedValue]);

  const prevPath = useRef('');

  const { asPath } = useRouter();

  // NOTE: keep a ref of the old path, so this affect only fires when the page actually changes
  // and does not run when only the query params change
  useEffect(() => {
    const pathWithoutSymbol = asPath.split("?")[0];
    if (pathWithoutSymbol !== prevPath.current) {
      setValue('');
      setPage(1);
      setResults(null);
      prevPath.current = pathWithoutSymbol;
    }
  }, [
    asPath
  ]);

  useEffect(() => {
    if (currentModal === 'search') {
      if (inputRef !== null) {
        // @ts-ignore
        inputRef.current.focus();
      }
    }
  }, [currentModal])

  useEffect(() => {
    let loadingTimer: NodeJS.Timeout;
    if (debouncedValue.length >= minValueLength) {
      loadingTimer = setTimeout(() => {
        setIsLoading(true); // only show loading if the request takes longer than x seconds
      }, 1000);

      try {
        const fetchResults = async () => {
          const query = qs.stringify({
            where: {
              or: [
                {
                  'meta.title': {
                    like: debouncedValue
                  }
                },
                {
                  'meta.description': {
                    like: debouncedValue
                  }
                },
                {
                  slug: {
                    like: debouncedValue
                  }
                },
              ]
            },
            page,
            depth: 1,
            sort: 'priority',
            limit: perPage,
          });

          const results = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?${query}`)).json();
          setResults(results);
          if (loadingTimer) {
            clearTimeout(loadingTimer)
          };
          setIsLoading(false);
        }

        fetchResults();
      } catch (e) {
        console.warn(e);
        setIsLoading(false);
        setError(JSON.stringify(e));
      }
    } else {
      setResults(null)
    }
    return () => {
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    }
  }, [debouncedValue, page]);

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef;
    if (current) {
      current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof page !== 'undefined' && page > 1) {
      scrollToRef()
    }
  }, [
    results,
    scrollToRef,
    page
  ]);

  const { totalHeaderHeight } = useHeaderHeight();

  const contactHref = formatSlug({
    relationTo: 'pages',
    value: contactPage
  })

  return (
    <Modal
      slug="search"
      className={classes.searchModal}
    >
      <div
        className={classes.wrapper}
        ref={scrollRef}
        style={{
          paddingTop: totalHeaderHeight
        }}
      >
        <BlockContainer className={classes.blockContainer}>
          <div className={classes.searchInputWrapper}>
            <input
              className={classes.searchInput}
              type="text"
              placeholder="Search"
              onChange={handleChange}
              value={value}
              ref={inputRef}
            />
            {value !== '' &&
              <button
                className={classes.closeButton}
                onClick={() => {
                  setValue('');
                }}
              >
                <CloseIcon
                  size="large"
                />
              </button>
            }
          </div>
        </BlockContainer>
        <div className={classes.body} >
          <BlockContainer
            className={classes.blockContainer}
            cellClassName={classes.blockContainerCell}
          >
            {debouncedValue?.length < minValueLength && (
              <Fragment>
                <div className={classes.bodyHeading}>
                  <div>
                    Popular Searches
                    <ul className={classes.popularSearchTerms}>
                      {popularSearchTerms?.length > 0 && popularSearchTerms.map(({ term }) => {
                        return (
                          <li key={term}>
                            <Button
                              size="small"
                              type="button"
                              appearance="secondaryButton"
                              label={term}
                              onClick={() => setValue(term)}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
                <div>
                  {`Can't find what you're looking for? `}
                  <Hyperlink
                    href={contactHref}
                    dimOnHover
                  >
                    Contact us
                  </Hyperlink>
                  .
                </div>
              </Fragment>
            )}
            {isLoading && (
              <div>
                Loading, please wait...
              </div>
            )}
            {error && (
              <div>
                {error}
              </div>
            )}
            {results?.docs?.length > 0 && (
              <Fragment>
                <div className={classes.pageRange}>
                  <PageRange
                    totalDocs={results.totalDocs}
                    currentPage={page}
                    collectionLabels={{
                      singular: 'Result',
                      plural: 'Results'
                    }}
                    limit={perPage}
                  />
                </div>
                <ul className={classes.results}>
                  {results.docs.map((result: SearchType, i: number) => {
                    const {
                      doc,
                      doc: {
                        relationTo
                      } = {}
                    } = result;

                    return (
                      <li
                        key={i}
                        className={classes.result}
                      >
                        <Grid className={classes.resultGrid}>
                          <ResultRow
                            alignItems="center"
                            title={result?.meta?.title}
                            doc={{
                              ...doc,
                              relationTo
                            }}
                            hideImagesOnMobile
                          />
                        </Grid>
                      </li>
                    )
                  })}
                </ul>
                <Pagination
                  className={classes.pagination}
                  totalPages={results?.totalPages}
                  currentPage={page}
                  onClick={setPage}
                />
              </Fragment>
            )}
            {results?.docs?.length === 0 && (
              <div className={classes.body}>
                <h3>
                  Nothing found for &ldquo;{value}&rdquo;
                </h3>
                <p>
                  {'Need help finding something? '}
                  <Hyperlink
                    href={contactHref}
                    className={classes.hyperlink}
                    dimOnHover
                  >
                    Contact us
                  </Hyperlink>
                  {' and we will help however we can.'}
                </p>
                <div className={classes.startOver}>
                  <Button
                    type="button"
                    appearance="secondaryButton"
                    label="Start over"
                    onClick={() => setValue('')}
                  />
                </div>
              </div>
            )}
          </BlockContainer>
        </div>
      </div>
    </Modal>
  )
}
