import { GetStaticProps } from 'next'
import { ArchiveLayout } from '@root/layout/Archive';
import { dummyPostsPage1 } from '../../../public/dummyData/dummyPosts';
import { DocFromCMS } from '@root/cms/types';
import { revalidationRate } from '@root/revalidationRate';
// import { revalidationRate } from '@root/revalidationRate';
// import { DocFromCMS } from '@root/types';

const Posts: React.FC = (props) => {
  return (
    <ArchiveLayout
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
  let props = {};
  let notFound = false;

  const offlineMode = process.env.NEXT_PUBLIC_OFFLINE_MODE;

  let postsData;

  if (offlineMode) {
    postsData = dummyPostsPage1.docs; // TODO: sort these by updatedAt, but in a performant way
  } else {
    const postsReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?depth=1&sort=createdAt&limit=10`);
    postsData = await postsReq.json();
  }

  if (postsData) {
    const { totalDocs }: {
      totalDocs: number
      docs: DocFromCMS[]
    } = postsData;

    if (totalDocs > 0) props = postsData
  } else notFound = true;

  return ({
    props,
    notFound,
    revalidate: revalidationRate
  })
}
