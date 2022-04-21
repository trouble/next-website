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
import { getPostCategoryBySlug, getSubsiteByID } from '@root/payload';
import { revalidationRate } from '@root/revalidationRate';
import { PayloadDoc, PostCategoryType } from '@root/types';

const Post: React.FC<PayloadDoc & {
  prev?: PayloadDoc | null
  next?: PayloadDoc | null
  category?: PostCategoryType
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

  // let paths = [] as string[];

  // const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&limit=100`);
  // const postsData = await postsReq.json();

  // if (postsData) {
  //   const {
  //     totalDocs,
  //     docs: posts
  //   } = postsData;

  //   if (totalDocs > 0) {
  //     const paths = [];
  //     posts.forEach((post: PostType) => {
  //       const {
  //         slug,
  //         categories
  //       } = post;

  //       if (slug) {
  //         paths.push(`/posts/${slug}`);
  //         if (categories) {
  //           categories.forEach((category) => {
  //             paths.push(`/posts/${category.slug}/${slug}`);
  //           })
  //         }
  //       }
  //     });
  //   }
  // }

  // return {
  //   paths,
  //   fallback: true,
  // };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return ({
    props: {}
  })
  // let doc = {};
  // let subsite = null;
  // let category = null;
  // let prev = null;
  // let next = null;
  // let notFound = false;

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

  // const {
  //   slug,
  //   category: categorySlug
  // } = params || {};

  // const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[slug][equals]=${slug}&limit=1&draft=true`, {
  //   headers: {
  //     ...preview ? {
  //       Authorization: `JWT ${payloadToken}`
  //     } : {}
  //   }
  // });

  // const postsData = await postsReq.json();

  // if (postsData) {
  //   const {
  //     totalDocs,
  //     docs
  //   } = postsData;

  //   if (totalDocs > 0) {
  //     const [foundDoc] = docs;

  //     if (foundDoc) {
  //       const { isPasswordProtected } = foundDoc;
  //       if (!isPasswordProtected) {
  //         doc = foundDoc;

  //         const {
  //           id,
  //           createdAt,
  //           categories
  //         } = foundDoc;

  //         const postHasCategory = categories.some((cat: PostCategory) => cat.slug === categorySlug);

  //         if (postHasCategory) {
  //           category = await getPostCategoryBySlug(categorySlug as string);
  //           if (category) {
  //             const { subsite: subsiteID } = category;

  //             if (typeof subsiteID === 'string') {
  //               subsite = await getSubsiteByID(subsiteID);
  //             }

  //             const prevPostReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[createdAt][less_than]=${createdAt}&where[categories.slug][in]=${categorySlug}&where[id][not_equals]=${id}&sort=-createdAt`);
  //             const prevPostData = await prevPostReq.json();

  //             if (prevPostData) {
  //               const { docs: prevDocs } = prevPostData;
  //               if (prevPostData.totalDocs > 0) {
  //                 const [prevPost] = prevDocs;
  //                 prev = prevPost;
  //               }
  //             }

  //             const nextPostReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[createdAt][greater_than]=${createdAt}&where[categories.slug][in]=${categorySlug}&where[id][not_equals]=${id}&sort=createdAt`);
  //             const nextPostData: {
  //               totalDocs: number
  //               docs: PostType[]
  //             } = await nextPostReq.json();

  //             if (nextPostData) {
  //               const { docs: nextDocs } = nextPostData;
  //               if (nextPostData.totalDocs > 0) {
  //                 const [nextPost] = nextDocs;
  //                 next = nextPost;
  //               }
  //             }
  //           }
  //         }
  //       } else {
  //         doc = {
  //           isPasswordProtected: true,
  //           id: foundDoc.id,
  //         }
  //       }
  //     } else notFound = true;
  //   } else notFound = true;
  // } else notFound = true;

  // return ({
  //   props: {
  //     ...doc,
  //     subsite,
  //     category,
  //     prev,
  //     next,
  //     preview: preview || null,
  //     collection: 'posts'
  //   },
  //   notFound,
  //   revalidate: revalidationRate
  // })
}
