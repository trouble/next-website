import { PayloadResponse, PostFromCMS } from "@root/cms/types"
import { dummyPost1 } from "./posts/post1"
import { dummyPost2 } from "./posts/post2"
import { dummyPost3 } from "./posts/post3"
import { dummyPost4 } from "./posts/post4"
import { dummyPost5 } from "./posts/post5"
import { dummyPost6 } from "./posts/post6"
import { dummyPost7 } from "./posts/post7"
import { dummyPost8 } from "./posts/post8"
import { dummyPost9 } from "./posts/post9"
import { dummyPost10 } from "./posts/post10"
import { dummyPost11 } from "./posts/post11"
import { dummyPost12 } from "./posts/post12"

export const dummyPosts: PayloadResponse & {
  docs: PostFromCMS[]
} = {
  totalDocs: 12,
  page: 1,
  limit: 100,
  totalPages: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 1,
  nextPage: 1,
  docs: [
    dummyPost1,
    dummyPost2,
    dummyPost3,
    dummyPost4,
    dummyPost5,
    dummyPost6,
    dummyPost7,
    dummyPost8,
    dummyPost9,
    dummyPost10,
    dummyPost11,
    dummyPost12
  ]
}

export const dummyPostsPage1: PayloadResponse & {
  docs: PostFromCMS[]
} = {
  totalDocs: 12,
  page: 1,
  limit: 10,
  totalPages: 2,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: 1,
  nextPage: 2,
  docs: [
    dummyPost1,
    dummyPost2,
    dummyPost3,
    dummyPost4,
    dummyPost5,
    dummyPost6,
    dummyPost7,
    dummyPost8,
    dummyPost9,
    dummyPost10
  ]
}

export const dummyPostsPage2: PayloadResponse = {
  totalDocs: 2,
  page: 2,
  totalPages: 2,
  limit: 10,
  hasPrevPage: true,
  hasNextPage: false,
  prevPage: 1,
  nextPage: 2,
  docs: [
    dummyPost11,
    dummyPost12,
  ]
}
