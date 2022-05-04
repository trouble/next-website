import { Breadcrumb } from "payload-plugin-nested-pages/dist/types"
import { BlocksType } from "@root/blocks"
import { ButtonAppearances } from "@components/Button"
import { HeroType } from "@root/heros/types"
import { Meta } from 'payload-plugin-seo/dist/types';

// docs, taxonomies, links, and media\

export type CollectionTypes = 'pages' | 'posts';

export type PayloadResponse = {
  totalDocs: number
  docs: DocFromCMS[]
  page: number
  limit: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number
  nextPage: number
}

export type PageFromCMS = {
  id: string
  updatedAt: string
  createdAt: string
  title: string
  hero: HeroType
  showBreadcrumbs?: boolean
  slug: string
  image?: any // TODO type this
  layout: BlocksType
  meta: Meta
  excerpt?: string
  parent?: PageFromCMS | string
  breadcrumbs?: Breadcrumb[]
}

export type DocFromCMS = (PageFromCMS | PostFromCMS)

export type PostFromCMS = {
  id: string
  updatedAt: string
  createdAt: string
  publishedDate: string
  title: string
  hero: HeroType
  showBreadcrumbs?: boolean
  slug: string
  image?: any // TODO type this
  layout: BlocksType
  meta: Meta
  excerpt?: string
  breadcrumbs?: Breadcrumb[]
  author: PayloadUser
  categories?: PayloadPostCategories
}

export type LinkFromCMS = {
  appearance?: ButtonAppearances
  type: 'reference' | 'custom'
  label?: string
  reference?: {
    relationTo: CollectionTypes
    value: PageFromCMS | PostFromCMS | 'null'
  }
  url?: string
  newTab?: boolean
}

export type LinkGroupFromCMS = {
  link: LinkFromCMS
}[]

export type PayloadPostCategory = {
  id: string
  title?: string
  description?: string
  slug?: string
  showDatesInArchive?: boolean
}

export type PayloadPostCategories = PayloadPostCategory[];

export type PayloadUser = {
  id: string
  email: string
}

export type PayloadMediaSizeDetails = {
  filename: string
  width: number
  height: number
}

export type PayloadMediaSize = 'thumbnail' | 'card' | 'square' | 'portrait' | 'feature' | 'hero';

export type PayloadMediaType = string | {
  id: string
  filename: string
  alt?: string
  mimeType?: string
  width?: number
  height?: number
  sizes?: {
    [key in PayloadMediaSize]: PayloadMediaSizeDetails // eslint-disable-line no-unused-vars
  },
  fallback?: PayloadMediaType
}
