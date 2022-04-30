import { PageFromCMS } from "@root/cms/types";

export const dummyGrandChildPage: PageFromCMS = {
  slug: "grandchild",
  createdAt: "2020-01-01T00:00:00.000Z",
  id: "899",
  title: "",
  updatedAt: "",
  showBreadcrumbs: true,
  breadcrumbs: [
    {
      label: 'Parent',
      url: '/parent',
      doc: '789'
    },
    {
      label: 'Child',
      url: '/parent/child',
      doc: '799'
    },
    {
      label: 'Grandchild',
      url: '/parent/child/grandchild',
      doc: '899'
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
              text: 'Grandchild page'
            }
          ]
        },
        {
          type: 'link',
          url: '/parent',
          children: [
            {
              text: 'Parent page'
            }
          ]
        },
        {
          type: 'paragraph',
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
      ]
    }
  },
  layout: [],
  meta: {},
}
