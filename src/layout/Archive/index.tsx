import { Fragment } from "react";
import Meta from "@components/Meta";
import { Hero } from '../Hero';
import { CollectionArchive } from "@components/CollectionArchive";
import Margin from "@components/Margin";
import { PayloadDoc, PostCategoryType } from "@root/types";

export const Archive: React.FC<{
  title?: string
  collection: 'posts' | 'people' | 'housing'
  docs?: PayloadDoc[]
  totalDocs?: number
  totalPages?: number
  page?: number
  prevPage?: number
  nextPage?: number
  hasNextPage?: number
  hasPrevPage?: number
  limit?: number
  category?: PostCategoryType
  showDates?: boolean
  sort?: string
  showCategories?: boolean
}
> = (props) => {
  const {
    title,
    collection,
    showDates,
    sort,
    showCategories
  } = props;

  return (
    <Fragment>
      <Meta
        title={title}
        description={`My Website ${collection}`}
      />
      <main>
        <Hero
          type="basic"
          content={{
            richText: [
              {
                type: 'h1',
                children: [
                  {
                    text: title,
                  },
                ]
              },
            ]
          }}
        />
        <Margin bottom="large">
          <CollectionArchive
            collection={collection}
            showDates={showDates}
            showCategories={showCategories}
            sort={sort}
          />
        </Margin>
      </main>
    </Fragment>
  )
}
