import { Fragment, useState } from 'react'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths
} from 'next';
import Blocks from '../layout/Blocks'
import { useEffect } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { Hero } from '../layout/Hero';
import Meta from '@components/Meta';
import { useRouter } from 'next/router';
import { revalidationRate } from '@root/revalidationRate';
import { DocFromCMS } from '@root/cms/types';
import { useBreadcrumbs } from '@root/providers/Breadcrumbs';
import { dummyPages } from '../../public/dummyData/dummyPages';
import { getOfflineDoc } from '../../public/dummyData/offlineAPI';
import { isUsingOfflineData } from '@root/utilities/isUsingOfflineData';

const Page: React.FC<DocFromCMS & {
  preview?: boolean
  passwordSuccess?: boolean
}> = (props) => {
  const [pageProps, setPageProps] = useState(props);

  useEffect(() => {
    // needed for nextjs fallbacks
    setPageProps(props)
  }, [props])

  const {
    layout,
    hero,
    showBreadcrumbs,
    meta,
  } = pageProps;

  const {
    isFallback // returned from getStaticPaths, see https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  } = useRouter();

  const {
    setShowBreadcrumbs,
  } = useBreadcrumbs();

  useEffect(() => {
    setShowBreadcrumbs(showBreadcrumbs)
  }, [
    setShowBreadcrumbs,
    showBreadcrumbs
  ]);

  return (
    <main>
      {isFallback && (
        <Hero
          type="basic"
          basic={{
            richText: [
              {
                type: 'p',
                children: [
                  {
                    text: 'Loading...'
                  }
                ]
              }
            ]
          }}
        />
      )}
      {!isFallback && (
        <Fragment>
          <Meta {...meta} />
          <div id="page-content">
            <Hero {...hero} />
            <Blocks blocks={layout} />
          </div>
        </Fragment>
      )}
    </main >
  )
}

export default Page;

interface IParams extends ParsedUrlQuery {
  slug: string[]
}

// when 'preview' cookies are set in the browser, getStaticProps runs on every request :)
// NOTE: 'slug' is an array (i.e. [...slug].tsx)
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const offlineMode = isUsingOfflineData();

  const {
    preview,
    previewData,
    params
  } = context;

  const {
    payloadToken
  } = previewData as {
    payloadToken: string
  } || {};

  let { slug } = params as IParams || {};
  if (!slug) slug = ['home'];

  let doc = {};
  let subsite = null;
  let notFound = false;

  const lastSlug = slug[slug.length - 1];

  let pageReq;
  let pageData;

  if (offlineMode) {
    const offlineData = getOfflineDoc(lastSlug, 'pages');
    if (offlineData) pageData = offlineData;
    else notFound = true;
  }

  if (!offlineMode) {
    // when previewing, send the payload token to bypass draft access control
    pageReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${lastSlug}&depth=2&draft=true`, {
      headers: {
        ...preview ? {
          Authorization: `JWT ${payloadToken}`
        } : {}
      }
    });
    if (pageReq.ok) {
      pageData = await pageReq.json();
    }
  }

  if (pageData) {
    const { docs } = pageData;

    if (docs.length > 0) {
      const slugChain = `/${slug.join('/')}`;
      // 'slug' is not unique, need to match the correct result to its last-most breadcrumb
      const foundDoc = docs.find((doc: DocFromCMS) => {
        const { breadcrumbs } = doc;
        const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
        if (hasBreadcrumbs) {
          const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
          return lastCrumb.url === slugChain;
        }
      })
      if (foundDoc) {
        doc = foundDoc
      } else notFound = true
    } else notFound = true;
  } else notFound = true;

  return ({
    props: {
      ...doc,
      subsite,
      preview: preview || null,
      collection: 'pages'
    },
    notFound,
    revalidate: revalidationRate
  })
}

type Path = {
  params: {
    slug: string[]
  }
};

type Paths = Path[];

export const getStaticPaths: GetStaticPaths = async () => {
  const useDummyData = process.env.NEXT_PUBLIC_OFFLINE_MODE;

  let paths: Paths = [];
  let pagesReq;
  let pagesData;

  if (useDummyData) {
    pagesData = dummyPages;
  } else {
    pagesReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[_status][equals]=published&depth=0&limit=300`);
    pagesData = await pagesReq.json();
  }

  if (pagesReq?.ok || useDummyData) {
    const { docs: pages } = pagesData;

    if (pages && Array.isArray(pages) && pages.length > 0) {
      paths = pages.map((page) => {
        const {
          slug,
          breadcrumbs,
        } = page;

        let slugs = [slug];

        const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

        if (hasBreadcrumbs) {
          slugs = breadcrumbs.map((crumb: any) => { // TODO: type this
            const { url } = crumb;
            let slug;
            if (url) {
              const split = url.split('/');
              slug = split[split.length - 1];
            }
            return slug;
          })
        }

        return ({ params: { slug: slugs } })
      });
    }
  }

  return {
    paths,
    fallback: true
  }
}
