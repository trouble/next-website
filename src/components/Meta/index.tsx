import { PayloadMediaType } from '@root/cms/types';
import NextHead from 'next/head';
import React, { Fragment } from 'react';

// NOTE: there is also an 'AppHead' component

export type MetaType = {
  title?: string
  description?: string
  keywords?: string
  image?: PayloadMediaType
}

const Meta: React.FC<MetaType> = (props) => {
  const {
    title,
    description,
    image, // may be 'null' so do not destructure
    keywords,
  } = props;

  let imageToUse;

  if (image && image !== null && typeof image !== 'string') {
    if (image?.mimeType !== 'video/mp4') {
      imageToUse = image;
    } else {
      const { fallback } = image;
      if (fallback && fallback !== null && typeof fallback !== 'string') {
        if (fallback?.mimeType !== 'video/mp4') imageToUse = fallback;
      }
    }
  }

  return (
    <NextHead>
      {title && (
        <Fragment>
          <title>
            {title}
          </title>
          <meta
            property="og:title"
            content={title}
          />
        </Fragment>
      )}
      {description && (
        <Fragment>
          <meta
            name="description"
            content={description}
          />
          <meta
            property="og:description"
            content={description}
          />
        </Fragment>
      )}
      {imageToUse && typeof imageToUse !== 'string' && (
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/media/${imageToUse?.filename}`}
        />
      )}
      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}
    </NextHead>
  );
};

export default Meta;
