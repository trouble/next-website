import { Hero } from "./Hero"
import { Breadcrumb } from "payload-plugin-nested-pages/dist/types"
// import { Meta } from "payload-plugin-seo/dist/types"

export type PayloadDoc = {
  id: string
  title: string
  hero: Hero
  showBreadcrumbs?: boolean
  slug: string
  image?: any // TODO type this
  layout: any // TODO type this
  meta: any // TODO: type this once the plugin exports it
  excerpt?: string
  parent?: PayloadDoc | string
  breadcrumbs?: Breadcrumb[]
  author: User
  updatedAt?: string
  appUrl?: string
  isPasswordProtected?: boolean
}

export type LinkAppearances = 'text' | 'primaryButton' | 'secondaryButton';

export type LinkType = {
  appearance?: LinkAppearances
  type: 'reference' | 'custom'
  label?: string
  reference?: {
    relationTo: 'pages' | 'posts' | 'housing'
    value: PayloadDoc | 'null'
  }
  url?: string
  newTab?: boolean
}

export type LinkGroupType = {
  link: LinkType
}[]

export type PostCategoryType = {
  id: string
  title?: string
  description?: string
  slug?: string
  showDatesInArchive?: boolean
}

export type PostCategoriesType = PostCategoryType[];

export type User = {
  id: string
  email: string
}

