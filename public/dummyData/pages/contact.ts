import { PayloadDoc } from "@root/cms/types";

export const dummyContactPage: PayloadDoc = {
  slug: "contact",
  id: "456",
  title: "",
  breadcrumbs: [
    {
      label: 'Contact',
      url: '/contact',
      doc: '456'
    }
  ],
  hero: {
    type: 'basic',
    basic: {
      richText: [
        {
          type: 'h1',
          children: [
            {
              text: 'Contact'
            }
          ]
        }
      ]
    }
  },
  layout: [],
  meta: {},
  author: {
    id: "",
    email: ""
  }
}
