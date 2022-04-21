import classes from './index.module.scss';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { Hyperlink } from '@components/Hyperlink';
import { Media } from '@components/Media';
import { Address, AddressType } from '@components/Address';
import { Fragment } from 'react';
import cssVariables from '../../../cssVariables';
// import { Placeholder } from '@root/graphics/Placeholder';
import { formatDateTime } from '@root/utilities/formatDateTime';
import { Breadcrumb as BreadcrumbType } from 'payload-plugin-nested-pages/dist/types';
// import { Meta as MetaType } from 'payload-plugin-seo/dist/types';
import { formatPermalink } from '@root/utilities/formatPermalink';
import { useRouter } from 'next/router';
import { PostCategoriesType } from '@root/types';

export const ResultRow: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  showPublishedDate?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  doc?: {
    relationTo?: string
    title?: string
    name?: string
    categories?: PostCategoriesType
    breadcrumbs?: BreadcrumbType[]
    slug?: string
    publishedDate?: string
    address?: AddressType
    meta: any // TODO: type this once payload-plugin-seo is updated
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
      relationTo,
      name,
      title,
      categories,
      publishedDate,
      meta,
      address,
    } = {}
  } = props;

  const {
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

  let href = formatPermalink(
    newDoc,
    currentCategory,
  );

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0;
  const titleToUse = titleFromProps || title || name; // people have names, not titles
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
            {/* {!metaImage && (
              <Placeholder className={classes.placeholder} />
            )} */}
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

                    const isLast = index === categories.length - 1;

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
          {
            (description || address) && (
              <div className={classes.body}>
                {description && (
                  <p className={classes.description}>
                    {sanitizedDescription}
                  </p>
                )}
                {address && (
                  <div className={classes.address}>
                    <Address {...address} />
                  </div>
                )}
              </div>
            )
          }
        </Cell >
      </Grid >
    </Cell >
  )
}
