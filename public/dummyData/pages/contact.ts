import { PageFromCMS } from "@root/cms/types";

export const dummyContactPage: PageFromCMS = {
  slug: "contact",
  createdAt: "2020-01-01T00:00:00.000Z",
  id: "456",
  title: "",
  updatedAt: "",
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
}
