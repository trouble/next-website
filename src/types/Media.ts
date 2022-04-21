export type SizeDetails = {
  filename: string
  width: number
  height: number
}

export type Size = 'thumbnail' | 'card' | 'square' | 'portrait' | 'feature' | 'hero';

export type PayloadMediaType = string | {
  id: string
  filename: string
  alt?: string
  mimeType?: string
  width?: number
  height?: number
  sizes?: {
    thumbnail?: SizeDetails
    card?: SizeDetails
    square?: SizeDetails
    portrait?: SizeDetails
    feature?: SizeDetails
    hero?: SizeDetails
  },
  fallback?: PayloadMediaType
}
