import { PageFromCMS } from "@root/cms/types";

export const dummyParentPage: PageFromCMS = {
  slug: "parent",
  createdAt: "2020-01-01T00:00:00.000Z",
  id: "789",
  title: "",
  updatedAt: "",
  breadcrumbs: [
    {
      label: 'Parent',
      url: '/parent',
      doc: '789'
    },
  ],
  hero: {
    type: 'basic',
    basic: {
      richText: [
        {
          type: 'h1',
          children: [
            {
              text: 'Parent page'
            }
          ]
        },
        {
          type: 'link',
          url: '/parent/child',
          children: [
            {
              text: 'Child page'
            }
          ]
        },
        {
          type: 'paragraph',
        },
        {
          type: 'link',
          url: '/parent/child/grandchild',
          children: [
            {
              text: 'Grandchild page'
            }
          ]
        },
      ]
    }
  },
  layout: [],
  meta: {},
}
