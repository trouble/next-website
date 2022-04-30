import React, { Fragment } from 'react';
import NextImage from 'next/image';
import classes from './index.module.scss'
import cssVariables from '../../../cssVariables';
import { MediaProps } from '..';

export const Image: React.FC<MediaProps> = (props) => {
  const {
    imgClassName,
    cmsImageSize,
    onClick,
    onLoad: onLoadFromProps,
    layout = 'responsive',
    objectFit,
    useNextImage = true,
    sizes,
    quality,
    mediaFromCMS,
    priority,
    placeholderColor = 'light'
  } = props;

  const [isLoading, setIsLoading] = React.useState(true);

  if (mediaFromCMS && typeof mediaFromCMS !== 'string') {
    const {
      width,
      height,
      sizes: cmsSizes,
      absolutePath,
      filename,
      alt,
    } = mediaFromCMS;

    let imageWidth = width;
    let imageHeight = height;
    let imageToUse = filename;
    let layoutToUse = layout;
    let objectFitToUse = objectFit;

    const foundSize = cmsImageSize && cmsSizes && cmsImageSize in cmsSizes && cmsSizes[cmsImageSize];

    if (cmsImageSize && foundSize) {
      let sizeIsValid = foundSize && Object.keys(foundSize).length > 0;

      if (sizeIsValid) {
        const {
          filename,
          width,
          height
        } = foundSize;

        imageToUse = filename;
        imageWidth = width;
        imageHeight = height;
      } else {
        // if no size, send the width and height of the original image to next/image for it to use as an aspect ratio
        const {
          width: staticWidth,
          height: staticHeight
        } = cmsSizes[cmsImageSize];

        imageWidth = staticWidth * 2; // hackish: double because next/image sets a max-width of 100% and some sizes are too small for them to fill entire containers (i.e. thumbnail)
        imageHeight = staticHeight * 2;

        if (layout !== 'fill') {
          layoutToUse = 'intrinsic';
          objectFitToUse = 'cover'
        }
      }
    }

    const baseProps = {
      className: [
        isLoading && placeholderColor && classes[`placeholder-color-${placeholderColor}`],
        classes.image,
        imgClassName
      ].filter(Boolean).join(' '),
      src: (absolutePath && imageToUse) ? imageToUse : `${process.env.NEXT_PUBLIC_API_URL}/media/${imageToUse}`,
      alt,
      onClick,
      onLoad: () => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps();
        }
      }
    }

    const sizesToUse: string = sizes || Object.entries(cssVariables.breakpoints).map(([, value]) => `(max-width: ${value}px) ${value}px`).join(', ');

    return (
      <Fragment>
        {!useNextImage && (
          <img
            {...baseProps}
            alt={alt}
          />
        )}
        {useNextImage && (
          <Fragment>
            {layoutToUse === 'responsive' && (
              <NextImage
                {...baseProps}
                layout="responsive"
                width={imageWidth}
                height={imageHeight}
                sizes={sizesToUse}
                quality={quality}
                priority={priority}
              />
            )}
            {layoutToUse === 'intrinsic' && (
              <NextImage
                {...baseProps}
                layout="intrinsic"
                objectFit={objectFitToUse}
                width={imageWidth}
                height={imageHeight}
                quality={quality}
                priority={priority}
              />
            )}
            {layoutToUse === 'fill' && (
              <NextImage
                {...baseProps}
                objectFit={objectFitToUse}
                layout="fill"
                quality={quality}
                priority={priority}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };

  return null
}

Image.displayName = 'Image';
