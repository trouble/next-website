import { PayloadResponse } from "@root/cms/types"
import { dummyContactPage } from "./pages/contact"
import { dummyHomePage } from "./pages/home"

export const dummyPages: PayloadResponse = {
  "totalDocs": 2,
  "docs": [
    dummyHomePage,
    dummyContactPage
  ]
}
