import { IGlobals } from "@root/providers/Globals";
import { dummyContactPage } from "./pages/contact";
import { dummyHomePage } from "./pages/home";

export const dummyGlobals: IGlobals = {
  mainMenu: {
    items: [
      {
        type: 'link',
        label: 'Home',
        link: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        },
      },
      {
        type: 'link',
        label: 'Posts',
        link: {
          type: 'custom',
          url: '/posts'
        },
      },
      {
        type: 'link',
        label: 'Styleguide',
        link: {
          type: 'custom',
          url: '/styleguide'
        },
      },
      {
        type: 'subMenu',
        label: 'More',
        subMenu: {
          column1: [
            {
              blockType: 'menuLink',
              appearance: 'primary',
              link: {
                label: 'Nested pages',
                type: 'custom',
              }
            },
            {
              blockType: 'menuLink',
              appearance: 'secondary',
              link: {
                label: 'Parent',
                type: 'custom',
                url: '/parent',
              }
            },
            {
              blockType: 'menuLink',
              appearance: 'secondary',
              link: {
                label: 'Child',
                type: 'custom',
                url: '/parent/child',
              }
            },
            {
              blockType: 'menuLink',
              appearance: 'secondary',
              link: {
                label: 'Grandchild',
                type: 'custom',
                url: '/parent/child/grandchild',
              }
            }
          ]
        }
      }
    ],
    secondaryItems: [
      {
        link: {
          type: 'reference',
          label: 'Contact',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        },
      },
      {
        link: {
          type: 'reference',
          label: 'Privacy Policy',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        }
      }
    ]
  },
  meta: {
    socialMediaLinks: [
      {
        platform: 'facebook',
        url: 'https://www.facebook.com/',
        label: 'Facebook',
      },
      {
        platform: 'instagram',
        url: 'https://www.instagram.com/',
        label: 'Instagram',
      },
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/',
        label: 'LinkedIn',
      }
    ],
    legalLinks: [
      {
        link: {
          type: 'reference',
          label: 'Contact',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        }
      },
      {
        link: {
          type: 'reference',
          label: 'Privacy Policy',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        }
      }
    ],
    locations: [
      {
        title: 'Headquarters',
        line1: '123 Main Street',
        line2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      }
    ],
    phone: "555-555-5555",
    popularSearchTerms: [],
    fallbackImage: {
      id: "",
      filename: ""
    },
    contactPage: dummyContactPage
  },
  footer: {
    column1: [
      {
        appearance: 'primary',
        useLink: true,
        label: 'Home',
        link: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: dummyHomePage
          }
        },
      },
      {
        appearance: 'primary',
        useLink: true,
        label: 'Posts',
        link: {
          type: 'custom',
          url: '/posts'
        },
      },
      {
        appearance: 'primary',
        useLink: true,
        label: 'Styleguide',
        link: {
          type: 'custom',
          url: '/styleguide'
        },
      },
    ],
    column2: []
  }
}
