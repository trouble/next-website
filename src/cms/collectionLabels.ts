export type PayloadCollectionLabel = {
  singular: string
  plural: string
}

export type PayloadCollectionLabels = {
  [collection: string]: PayloadCollectionLabel;
}

export const collectionLabels: PayloadCollectionLabels = {
  posts: {
    singular: 'Post',
    plural: 'Posts',
  },
  pages: {
    singular: 'Page',
    plural: 'Pages',
  },
  housing: {
    singular: 'Property',
    plural: 'Properties'
  },
  people: {
    singular: 'Person',
    plural: 'People',
  },
}
