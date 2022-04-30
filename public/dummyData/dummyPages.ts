import { PayloadResponse } from "@root/cms/types"
import { dummyChildPage } from "./pages/childPage"
import { dummyContactPage } from "./pages/contact"
import { dummyHomePage } from "./pages/home"
import { dummyParentPage } from "./pages/parentPage"
import { dummyGrandChildPage } from "./pages/grandChildPage"

export const dummyPages: PayloadResponse = {
  totalDocs: 2,
  page: 1,
  limit: 10,
  totalPages: 1,
  nextPage: 1,
  prevPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  docs: [
    dummyHomePage,
    dummyContactPage,
    dummyParentPage,
    dummyChildPage,
    dummyGrandChildPage
  ]
}
