export type SizeDetails = {
  filename: string
  width: number
  height: number
}

export type MediaSize = 'thumbnail' | 'card' | 'square' | 'portrait' | 'feature' | 'hero';

export type PayloadMediaType = string | {
  id: string
  filename: string
  alt?: string
  mimeType?: string
  width?: number
  height?: number
  sizes?: {
    [key in MediaSize]: SizeDetails // eslint-disable-line no-unused-vars
  },
  fallback?: PayloadMediaType
}
