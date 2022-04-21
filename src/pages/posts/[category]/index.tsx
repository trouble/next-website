import { Fragment } from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  //  GetStaticPropsContext
} from 'next'
import { Archive } from '@root/layout/Archive';
import { useRouter } from 'next/router';
import { Hero } from '@root/layout/Hero';
// import { revalidationRate } from '@root/revalidationRate';
import { PostCategoryType } from '@root/types';

const Posts: React.FC<{
  category: PostCategoryType
}> = (props) => {
  const {
    category: {
      title: categoryTitle,
      showDatesInArchive,
    } = {}
  } = props;

  const {
    isFallback // returned from getStaticPaths, see https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  } = useRouter();

  return (
    <Fragment>
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
        <Archive
          collection="posts"
          title={categoryTitle}
          showCategories
          showDates={showDatesInArchive}
          sort="-publishedDate"
          {...props}
        />
      )}
    </Fragment>
  )
}

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [] as string[];

  const categoriesReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post-categories?depth=0`);
  const categoriesData = await categoriesReq.json();

  if (categoriesData) {
    const {
      totalDocs,
      docs: categories
    } = categoriesData;

    if (totalDocs > 0) {
      paths = categories.map((category: PostCategoryType) => {
        const { slug: categorySlug } = category;
        return `/posts/${categorySlug}`;
      })
    }
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  // context: GetStaticPropsContext
) => {
  return ({
    props: {}
  })
  // let posts = {};
  // let subsite = null;
  // let category = null;
  // let notFound = false;

  // const { params } = context;
  // const {
  //   category: categorySlug
  // } = params || {};

  // const categoryReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post-categories?where[slug][equals]=${categorySlug}&limit=100&depth=1`);
  // const categoryData = await categoryReq.json();
  // const [fullCategory] = categoryData?.docs;

  // if (fullCategory) {
  //   category = fullCategory;
  //   const subsiteID = fullCategory?.subsite?.id;
  //   if (subsiteID) {
  //     subsite = await getSubsiteByID(subsiteID);
  //   }

  //   const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?where[categories.slug][in]=${categorySlug}&sort=createdAt&limit=10&depth=1`);
  //   posts = await postsReq.json();
  // } else notFound = true;

  // return ({
  //   props: {
  //     ...posts,
  //     subsite,
  //     category,
  //   },
  //   notFound,
  //   revalidate: revalidationRate
  // })
}
