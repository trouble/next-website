import { Fragment } from "react";
import Meta from "@components/Meta";
import { CollectionArchive } from "@components/CollectionArchive";
import Margin from "@components/Margin";
import { CollectionTypes, DocFromCMS, PayloadPostCategory } from "@root/cms/types";
import { BasicHero } from "@root/heros/Basic";

export const ArchiveLayout: React.FC<{
  title?: string
  collection: CollectionTypes
  docs?: DocFromCMS[]
  totalDocs?: number
  totalPages?: number
  page?: number
  prevPage?: number
  nextPage?: number
  hasNextPage?: number
  hasPrevPage?: number
  limit?: number
  category?: PayloadPostCategory
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
        <BasicHero
          richText={[
            {
              type: 'h1',
              children: [
                {
                  text: `All ${collection}`
                }
              ]
            }
          ]}
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
