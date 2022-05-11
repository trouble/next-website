import { Fragment, useEffect, useState } from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import Blocks from '@root/layout/Blocks';
import { Hero } from '@root/layout/Hero';
import Meta from '@components/Meta';
import { PrevNext } from '@components/PrevNext';
import { useRouter } from 'next/router';
import { PayloadPostCategory, PayloadResponse, PostFromCMS } from '@root/cms/types';
import { revalidationRate } from '@root/revalidationRate';
import { getOfflineDoc, getOfflinePrevNext } from '../../../public/dummyData/offlineAPI';
import { isUsingOfflineData } from '@root/utilities/isUsingOfflineData';

const Post: React.FC<PostFromCMS & {
  prev?: PostFromCMS | null
  next?: PostFromCMS | null
  category?: PayloadPostCategory
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
    meta,
    prev,
    next,
    category,
  } = pageProps;

  const {
    isFallback // returned from getStaticPaths, see https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  } = useRouter();

  return (
    <div>
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
            <Hero  {...hero} />
            <Blocks blocks={layout} />
            <PrevNext
              category={category}
              prev={prev}
              next={next}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  return ({
    paths: [],
    fallback: true
  })
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const offlineMode = isUsingOfflineData();

  let doc = {};
  let subsite = null;
  let category = null;
  let prev = null;
  let next = null;
  let notFound = false;

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

  const {
    slug,
  } = params || {};

  let postsData: PayloadResponse | undefined;

  if (offlineMode) {
    const offlineData = getOfflineDoc(slug as string, 'posts');
    if (offlineData) postsData = offlineData;
    else notFound = true
  }

  if (!offlineMode) {
    const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[slug][equals]=${slug}&limit=1&draft=true`, {
      headers: {
        ...preview ? {
          Authorization: `JWT ${payloadToken}`
        } : {}
      }
    });
    postsData = await postsReq.json();
  }

  if (postsData) {
    const {
      totalDocs,
      docs
    } = postsData;

    if (totalDocs > 0) {
      const [foundDoc] = docs;

      if (foundDoc) {
        doc = foundDoc;

        const {
          id,
          createdAt,
        } = foundDoc;

        if (offlineMode) {
          const offlinePrevNext = getOfflinePrevNext(foundDoc as PostFromCMS);
          prev = offlinePrevNext.prev;
          next = offlinePrevNext.next;
        }

        if (!offlineMode) {
          const prevPostReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[createdAt][less_than]=${createdAt}&where[id][not_equals]=${id}&sort=-createdAt`);
          const prevPostData = await prevPostReq.json();
          if (prevPostData) {
            const { docs: prevDocs } = prevPostData;
            if (prevPostData.totalDocs > 0) {
              const [prevPost] = prevDocs;
              prev = prevPost;
            }
          }

          const nextPostReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[createdAt][greater_than]=${createdAt}&where[id][not_equals]=${id}&sort=createdAt`);
          const nextPostData = await nextPostReq.json();
          if (nextPostData) {
            const { docs: nextDocs } = nextPostData;
            if (nextPostData.totalDocs > 0) {
              const [nextPost] = nextDocs;
              next = nextPost;
            }
          }
        }
      } else notFound = true;
    } else notFound = true;
  } else notFound = true;

  return ({
    props: {
      ...doc,
      subsite,
      category,
      prev,
      next,
      preview: preview || null,
      collection: 'posts'
    },
    notFound,
    revalidate: revalidationRate
  })
}
