import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from 'next'
import { Archive } from '@root/layout/Archive';
import { revalidationRate } from '@root/revalidationRate';
import { PayloadDoc, PostCategoryType } from '@root/types';

const Posts: React.FC<{
  category: PostCategoryType
}> = (props) => {
  const {
    category: {
      title: categoryTitle,
      showDatesInArchive,
    }
  } = props;

  return (
    <Archive
      collection="posts"
      title={categoryTitle}
      showCategories
      showDates={showDatesInArchive}
      sort="publishedDate"
      {...props}
    />
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
      const categoryPromises = categories.map((category: PostCategoryType) => {
        const queryPostsByCategory = async () => {
          const { slug: categorySlug } = category;
          const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[category.slug][equals]=${categorySlug}&sort=createdAt&limit=10`);
          const postsData = await postsReq.json();

          if (postsData) {
            const { totalPages } = postsData;
            const pagesAsArray: number[] = Array.from(Array(totalPages).keys());
            pagesAsArray.forEach((page) => {
              paths.push(`/posts/${categorySlug}/page/${page + 1}`) // index starts at 0
            });
          }

        }
        return queryPostsByCategory();
      })

      await Promise.all(categoryPromises);
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let posts = {};
  let subsite = null;
  let category = null;
  let notFound = false;

  const { params } = context;
  const {
    category: categorySlug,
    page
  } = params || {};

  const categoryReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post-categories?where[slug][equals]=${categorySlug}`);
  const categoryData = await categoryReq.json();

  const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&where[categories.slug][in]=${categorySlug}&sort=createdAt&limit=10&page=${page}`);
  const postsData: {
    totalDocs: number
    docs: PayloadDoc[]
  } = await postsReq.json();

  if (postsData) {
    const { totalDocs } = postsData;
    if (totalDocs > 0) {
      posts = postsData
    }
  } else notFound = true;

  category = categoryData?.docs?.[0];

  return ({
    props: {
      ...posts,
      category,
      subsite,
    },
    notFound,
    revalidate: revalidationRate
  })
}
