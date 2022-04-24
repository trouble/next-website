import { Breadcrumb } from "payload-plugin-nested-pages/dist/types"
import { BlocksType } from "@root/blocks"
import { ButtonAppearances } from "@components/Button"
import { HeroType } from "@root/heros/types"

// docs, taxonomies, links, and media

export type PayloadDoc = {
  id: string
  title: string
  hero: HeroType
  showBreadcrumbs?: boolean
  slug: string
  image?: any // TODO type this
  layout: BlocksType
  meta: any // TODO: type this once the plugin exports it
  excerpt?: string
  parent?: PayloadDoc | string
  breadcrumbs?: Breadcrumb[]
  author: PayloadUser
  updatedAt?: string
  appUrl?: string
  isPasswordProtected?: boolean
}

export type PayloadLink = {
  appearance?: ButtonAppearances
  type: 'reference' | 'custom'
  label?: string
  reference?: {
    relationTo: 'pages' | 'posts' | 'housing'
    value: PayloadDoc | 'null'
  }
  url?: string
  newTab?: boolean
}

export type PayloadLinkGroup = {
  link: PayloadLink
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
