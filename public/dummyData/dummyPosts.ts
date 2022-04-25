import { PayloadResponse } from "@root/cms/types"
import { dummyPost1 } from "./posts/post1"
import { dummyPost2 } from "./posts/post2"
import { dummyPost3 } from "./posts/post3"
import { dummyPost4 } from "./posts/post4"
import { dummyPost5 } from "./posts/post5"
import { dummyPost6 } from "./posts/post6"
import { dummyPost7 } from "./posts/post7"
import { dummyPost8 } from "./posts/post8"

export const dummyPosts: PayloadResponse = {
  totalDocs: 10,
  docs: [
    dummyPost1,
    dummyPost2,
    dummyPost3,
    dummyPost4,
    dummyPost5,
    dummyPost6,
    dummyPost7,
    dummyPost8
  ]
}
