import { IGlobals } from "@root/providers/Globals";
import { dummyContactPage } from "./pages/contact";
import { dummyHomePage } from "./pages/home";

export const dummyGlobals: IGlobals = {
  mainMenu: {
    items: [
      {
        type: 'link',
        label: 'Contact',
        link: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: dummyContactPage
          }
        },
      }
    ],
    secondaryItems: []
  },
  meta: {
    socialMediaLinks: [],
    legalLinks: [],
    locations: [],
    phone: "",
    nationalPhone: "",
    fax: "",
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
        label: 'Contact',
        link: {
          type: 'reference',
          reference: {
            relationTo: 'pages',
            value: dummyContactPage
          }
        },
      }
    ],
    column2: []
  }
}
