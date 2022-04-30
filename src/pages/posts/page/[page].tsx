import {
  GetStaticPaths,
  GetStaticProps,
  // GetStaticPropsContext,
} from 'next'

import { ArchiveLayout } from '@root/layout/Archive';
// import { revalidationRate } from '@root/revalidationRate';
// import { DocFromCMS } from '@root/types';

const Posts: React.FC = (props) => {
  return (
    <ArchiveLayout
      collection="posts"
      title="All posts"
      showDates
      showCategories
      {...props}
    />
  )
}

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [] as string[];

  // const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=0`);
  // const postsData = await postsReq.json();

  // if (postsData) {
  //   const {
  //     totalDocs,
  //     totalPages
  //   } = postsData;

  //   if (totalDocs > 0) {
  //     const pagesAsArray: number[] = Array.from(Array(totalPages).keys());
  //     paths = pagesAsArray.map((page) => `/posts/page/${page + 1}`); // index starts at 0
  //   }
  // }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  // context: GetStaticPropsContext
) => {
  return ({
    props: {}
  })

  // let props = {};
  // let notFound = false;

  // const { params } = context;
  // const { page } = params || {};

  // const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1sort=createdAt&limit=10&page=${page}`);
  // const postsData = await postsReq.json();

  // if (postsData) {
  //   const { totalDocs }: {
  //     totalDocs: number
  //     docs: DocFromCMS[]
  //   } = postsData;

  //   if (totalDocs > 0) props = postsData
  // } else notFound = true;

  // return ({
  //   props,
  //   notFound,
  //   revalidate: revalidationRate
  // })
}
