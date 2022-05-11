import classes from './index.module.scss';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { Hyperlink } from '@components/Hyperlink';
import { Media } from '@components/Media';
import { Fragment } from 'react';
import cssVariables from '../../cssVariables';
import { formatDateTime } from '@root/utilities/formatDateTime';
import { formatSlug } from '@root/utilities/formatSlug';
import { useRouter } from 'next/router';
import { CollectionTypes, DocFromCMS, PayloadPostCategories, PostFromCMS } from '@root/cms/types';
import PlaceholderImage from '../../../public/placeholder.jpg';
import NextImage from 'next/image';

export const ResultRow: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  showPublishedDate?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  doc: DocFromCMS & {
    relationTo?: CollectionTypes
  }
}> = (props) => {
  const {
    alignItems,
    showCategories,
    showPublishedDate,
    hideImagesOnMobile,
    title: titleFromProps,
    doc,
    doc: {
      relationTo, // ?
      title,
      meta,
    } = {}
  } = props;

  let categories: PayloadPostCategories | undefined;
  let publishedDate;

  if (relationTo === 'posts') {
    const docAsPost = doc as PostFromCMS;
    categories = docAsPost?.categories;
    publishedDate = docAsPost?.publishedDate;
  }

  const {
    title: metaTitle,
    description,
    image: metaImage
  } = meta || {};

  const {
    query: {
      category: currentCategory,
    } = {},
  } = useRouter();

  const newDoc = {
    relationTo,
    value: doc,
  };

  let href = formatSlug(
    newDoc,
    currentCategory,
  );

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || metaTitle || title;
  const sanitizedDescription = description?.replace(/\s/g, ' ');

  return (
    <Cell
      className={classes.row}
      cols={12}
      colsM={8}
    >
      <Grid
        className={[
          alignItems === 'center' && classes.centerAlign
        ].filter(Boolean).join(' ')}
      >
        <Cell
          cols={3}
          colsM={8}
          className={hideImagesOnMobile === true ? classes.hideImageOnMobile : undefined}
        >
          <Hyperlink href={href}>
            {!metaImage && (
              <NextImage
                src={PlaceholderImage}
              />
            )}
            {metaImage && typeof metaImage !== 'string' && (
              <Media
                className={classes.media}
                mediaFromCMS={metaImage}
                cmsImageSize="thumbnail"
                sizes={`(min - width: ${cssVariables.breakpoints.m + 1}px) 12.5vw, (max - width: ${cssVariables.breakpoints.m}) 100vw`}
              />
            )}
          </Hyperlink>
        </Cell>
        <Cell
          className={classes.content}
          cols={9}
          colsM={8}
        >
          {((showPublishedDate && publishedDate) || (showCategories && hasCategories)) && (
            <div className={classes.leader}>
              {showPublishedDate && publishedDate &&
                <div>
                  {formatDateTime(publishedDate)}
                </div>
              }
              {publishedDate && hasCategories && (
                <div>
                  &mdash;
                </div>
              )}
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    const {
                      title: categoryTitle,
                      slug: categorySlug
                    } = category;

                    const isLast = index === (categories?.length || 0) - 1;

                    return (
                      <Fragment key={index}>
                        <Hyperlink
                          href={`/${relationTo}?categories=${categorySlug}`}
                          dimOnHover
                        >
                          {categoryTitle}
                        </Hyperlink>
                        {!isLast && (
                          <Fragment>
                            ,
                            &nbsp;
                          </Fragment>
                        )}
                      </Fragment>
                    )
                  })}
                </div>
              )}
            </div>
          )}
          <h4 className={classes.title}>
            <Hyperlink
              href={href}
              dimOnHover
            >
              {titleToUse}
            </Hyperlink>
          </h4>
          {description && (
            <div className={classes.body}>
              {description && (
                <p className={classes.description}>
                  {sanitizedDescription}
                </p>
              )}
            </div>
          )}
        </Cell >
      </Grid >
    </Cell >
  )
}
