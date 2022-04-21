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
import { PayloadDoc } from '@root/types';
import { useBreadcrumbs } from '@root/providers/Breadcrumbs';

const Page: React.FC<PayloadDoc & {
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
    isPasswordProtected,
    passwordSuccess
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
      {!isFallback && (!isPasswordProtected || passwordSuccess) && (
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
  return {
    props: {}
  }

  // const {
  //   preview,
  //   previewData,
  //   params
  // } = context;

  // const {
  //   payloadToken
  // } = previewData as {
  //   payloadToken: string
  // } || {};

  // let { slug } = params as IParams || {};
  // if (!slug) slug = ['home'];

  // let doc = {};
  // let subsite = null;
  // let notFound = false;

  // const lastSlug = slug[slug.length - 1];

  // when previewing, send the payload token to bypass draft access control
  // const pageReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[slug][equals]=${lastSlug}&depth=2&draft=true`, {
  //   headers: {
  //     ...preview ? {
  //       Authorization: `JWT ${payloadToken}`
  //     } : {}
  //   }
  // });

  // const pageData = await pageReq.json();

  // if (pageReq.ok) {
  //   const { docs } = pageData;

  //   if (docs.length > 0) {
  //     const slugChain = `/${slug.join('/')}`;
  //     const foundDoc = docs.find((doc: PayloadDoc) => { // 'slug' is not unique, need to match the correct result to its last-most breadcrumb
  //       const { breadcrumbs } = doc;
  //       const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
  //       if (hasBreadcrumbs) {
  //         const lastCrumb = breadcrumbs[breadcrumbs.length - 1];
  //         return lastCrumb.url === slugChain;
  //       }
  //     })
  //     if (foundDoc) {
  //       doc = foundDoc
  //     } else notFound = true
  //   } else notFound = true;
  // } else notFound = true;

  // return ({
  //   props: {
  //     ...doc,
  //     subsite,
  //     preview: preview || null,
  //     collection: 'pages'
  //   },
  //   notFound,
  //   revalidate: revalidationRate
  // })
}

type Path = {
  params: {
    slug: string[]
  }
};

type Paths = Path[];

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };

  // let paths: Paths = [];

  // const pagesReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages?where[_status][equals]=published&depth=0&limit=300`);
  // const pagesData = await pagesReq.json();

  // if (pagesReq.ok) {
  //   const { docs: pages } = pagesData;

  //   if (pages && Array.isArray(pages) && pages.length > 0) {
  //     paths = pages.map((page) => {
  //       const {
  //         slug,
  //         breadcrumbs,
  //       } = page;

  //       let slugs = [slug];

  //       const hasBreadcrumbs = breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;

  //       if (hasBreadcrumbs) {
  //         slugs = breadcrumbs.map((crumb: any) => { // TODO: type this
  //           const { url } = crumb;
  //           let slug;
  //           if (url) {
  //             const split = url.split('/');
  //             slug = split[split.length - 1];
  //           }
  //           return slug;
  //         })
  //       }

  //       return ({ params: { slug: slugs } })
  //     });
  //   }
  // }

  // return {
  //   paths,
  //   fallback: true
  // }
}
