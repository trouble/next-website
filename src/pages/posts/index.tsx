import { GetStaticProps } from 'next'
import { Archive } from '@root/layout/Archive';
// import { revalidationRate } from '@root/revalidationRate';
// import { PayloadDoc } from '@root/types';

const Posts: React.FC = (props) => {
  return (
    <Archive
      title="All posts"
      collection="posts"
      showDates
      showCategories
      {...props}
    />
  )
}

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  return ({
    props: {}
  })

  // let props = {};
  // let notFound = false;

  // const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&sort=createdAt&limit=10`);
  // const postsData = await postsReq.json();

  // if (postsData) {
  //   const { totalDocs }: {
  //     totalDocs: number
  //     docs: PayloadDoc[]
  //   } = postsData;

  //   if (totalDocs > 0) props = postsData
  // } else notFound = true;

  // return ({
  //   props,
  //   notFound,
  //   revalidate: revalidationRate
  // })
}
