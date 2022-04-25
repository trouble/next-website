import { PayloadDoc } from "@root/cms/types";

export const dummyHomePage: PayloadDoc = {
  slug: "home",
  id: "123",
  title: "",
  hero: {
    type: 'basic',
    basic: {
      richText: [
        {
          type: 'h1',
          children: [
            {
              text: 'Hello, world!'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: `You are currently in "offline mode", which boots your app detached from any CMS. All data is currently being served statically from the public directory. This is the static home page located at "/public/dummyData/pages/home.ts". You can freely edit any of these files to simulate your API. To turn this off, set "NEXT_PUBLIC_OFFLINE_MODE" to false in your env.`
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'There is also a static '
            },
            {
              type: 'link',
              url: '/styleguide',
              children: [
                {
                  text: 'styleguide'
                }
              ]
            },
            {
              text: ' which includes a page for each layout building block in your app. These pages are not indexed by search engines to provide a great place to troubleshoot UI even in production environments.'
            }
          ]
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'For more information there is a comprehensive '
            },
            {
              type: 'link',
              url: 'https://github.com/trouble/next-website#readme',
              children: [
                {
                  text: 'README.md'
                }
              ]
            },
            {
              text: ' which includes a step-by-step to getting started, troubleshooting tips, and more.'
            },
          ]
        }
      ]
    }
  },
  breadcrumbs: [
    {
      label: 'Home',
      url: '/home',
      doc: '123'
    }
  ],
  layout: [],
  meta: {},
  author: {
    id: "",
    email: ""
  }
}
