import { PageFromCMS } from "@root/cms/types";

export const dummyChildPage: PageFromCMS = {
  slug: "child",
  createdAt: "2020-01-01T00:00:00.000Z",
  id: "799",
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
              text: 'Child page'
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
