import { Cell, Grid } from '@faceless-ui/css-grid';
import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';
import classes from './index.module.scss'
import { RichText, RichTextType } from '@components/RichText';
import { CollectionArchive } from '@components/CollectionArchive';
import { BlockID } from '@components/BlockID';
import { CollectionTypes } from '@root/cms/types';

export type ArchiveBlockType = {
  blockType?: 'archive'
  blockName?: string
  introContent?: RichTextType
  collection: CollectionTypes
}

export const ArchiveBlock: React.FC<ArchiveBlockType & {
  id?: string
}> = (props) => {
  const {
    introContent,
    id,
    collection,
    blockName
  } = props;

  let sort = 'title';
  if (collection === 'posts') sort = '-publishedDate';

  return (
    <div
      id={`block-${id}`}
      className={classes.archiveBlock}
    >
      <BlockID id={blockName || id} />
      {introContent && (
        <BlockContainer className={classes.introContent}>
          <Grid>
            <Cell
              cols={12}
              colsM={8}
            >
              <RichText content={introContent} />
            </Cell>
          </Grid>
        </BlockContainer>
      )}
      <CollectionArchive
        collection={collection}
        sort={sort}
      />
    </div>
  )
}
