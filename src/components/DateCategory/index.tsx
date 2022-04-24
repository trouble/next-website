import React, { Fragment } from 'react';
import { Hyperlink } from '@components/Hyperlink';
import { formatDateTime } from '@root/utilities/formatDateTime';

import classes from './index.module.scss';
import { PayloadPostCategories } from '@root/cms/types';

export type DateCategoryType = {
  publishedDate?: string
  categories?: PayloadPostCategories
}

export const DateCategory: React.FC<DateCategoryType> = (props) => {
  const {
    publishedDate,
    categories,
  } = props;

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;

  return (
    <div className={classes.wrap}>
      {publishedDate &&
        <div>
          {formatDateTime(publishedDate)}
        </div>
      }
      {publishedDate && hasCategories && (
        <div className={classes.dash}>
          &mdash;
        </div>
      )}
      {hasCategories && (
        <div>
          {categories?.map((category, index) => {
            const {
              title: categoryTitle,
              slug: categorySlug
            } = category;

            const isLast = index === categories.length - 1;

            return (
              <Fragment key={index}>
                <Hyperlink
                  href={`/posts/${categorySlug}`}
                  dimOnHover
                >
                  {categoryTitle}
                </Hyperlink>
                {!isLast && (
                  <Fragment>
                    ,
                    {' '}
                  </Fragment>
                )}
              </Fragment>
            )
          })}
        </div>
      )}
    </div>
  )
}
