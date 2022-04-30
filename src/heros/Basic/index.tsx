import React from 'react';
import classes from './index.module.scss';
import { RichText, RichTextType } from '@components/RichText'
import { BlockContainer } from '@root/layout/BlockContainer';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { PageCrumb } from '@components/PageCrumb';
import { DateCategory } from '@components/DateCategory';
import { LinkGroupFromCMS, PayloadPostCategories } from '@root/cms/types';

export type BasicHeroType = {
  type?: 'basic'
  links?: LinkGroupFromCMS
  richText?: RichTextType
  publishedDate?: string
  categories?: PayloadPostCategories
}

export const BasicHero: React.FC<BasicHeroType> = (props) => {
  const {
    richText,
    publishedDate,
    categories,
  } = props;

  return (
    <div
      className={[
        classes.basicHero,
      ].filter(Boolean).join(' ')}
    >
      <BlockContainer className={classes.content}>
        <Grid>
          <Cell
            cols={12}
            colsM={8}
          >
            <PageCrumb className={classes.pageCrumb} />
            {(publishedDate || categories) &&
              <DateCategory
                publishedDate={publishedDate}
                categories={categories}
              />
            }
            <RichText content={richText} />
          </Cell>
        </Grid>
      </BlockContainer>
    </div>
  )
}
