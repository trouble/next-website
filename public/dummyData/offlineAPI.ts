import { PayloadResponse, PostFromCMS } from "@root/cms/types";
import { dummyPages } from "./dummyPages";
import { dummyPosts } from "./dummyPosts";

export const getOfflineDoc = (
  documentSlug: string,
  collectionSlug: string
): PayloadResponse | null => {
  let foundPost;

  if (collectionSlug === "posts") {
    foundPost = dummyPosts.docs.find((post) => post.slug === documentSlug);
  }

  if (collectionSlug === 'pages') {
    foundPost = dummyPages.docs.find((page) => page.slug === documentSlug);
  }

  if (foundPost) {
    return {
      totalDocs: 1,
      page: 1,
      limit: 1,
      totalPages: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: 1,
      nextPage: 1,
      docs: [foundPost],
    }
  }

  return null;
}

export const getOfflinePrevNext = (currentDoc: PostFromCMS): {
  prev: PostFromCMS | null
  next: PostFromCMS | null
} => {
  const { id } = currentDoc;

  let prev: PostFromCMS | null = null;
  let next: PostFromCMS | null = null;

  const sorted = dummyPosts.docs.sort((a, b) => {
    const aUpdatedAtMS = new Date(a.updatedAt).getTime();
    const bUpdatedAtMS = new Date(b.updatedAt).getTime();
    return aUpdatedAtMS - bUpdatedAtMS;
  });

  const thisIndex = sorted.findIndex((post) => post.id === id);

  if (thisIndex > -1) {
    prev = sorted[thisIndex - 1] || null;
    next = sorted[thisIndex + 1] || null;
  }

  return {
    prev,
    next,
  }

}
