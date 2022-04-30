import { PostFromCMS } from "@root/cms/types";

export const dummyPost5: PostFromCMS = {
  slug: "post5",
  id: "5",
  title: "",
  hero: {
    type: "basic",
    basic: {
      richText: [
        {
          type: "h1",
          children: [
            {
              text: "Post 5",
            }
          ]
        }
      ]
    }
  },
  layout: [
    {
      blockType: "content",
      columns: [
        {
          width: "full",
          richText: [
            {
              type: "paragraph",
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna eu tincidunt congue, nisi nisl tincidunt nisi, eget porttitor nisl nisi euismod nisi. Sed euismod, urna eu tincidunt congue, nisi nisl tincidunt nisi, eget porttitor nisl nisi euismod nisi. Sed euismod, urna eu tincidunt congue, nisi nisl tincidunt nisi, eget porttitor nisl nisi euismod nisi. Sed euismod, urna eu tincidunt congue, nisi nisl tincidunt nisi, eget porttitor nisl nisi euismod nisi. Sed euismod, urna eu tincidunt congue, nisi nisl tincidunt nisi, eget porttitor nisl nisi euismod nisi. Sed euismod, urna eu tincidunt congue."
            }
          ]
        }
      ]
    }
  ],
  createdAt: "2020-01-01T00:00:00.000Z",
  updatedAt: "2022-02-22T20:24:14.698Z",
  publishedDate: "2022-02-22T20:24:10.698Z",
  meta: {
    title: 'Post 5',
    description: 'Lorem ipsum dolor sit amet consecetur.',
    image: null
  },
  author: {
    id: "",
    email: ""
  }
}
