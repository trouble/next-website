import React, { ElementType, Fragment, Ref } from 'react';
import { Video } from './Video';
import { Image } from './Image';
import { PayloadMediaSize, PayloadMediaType } from '@root/cms/types';

export type MediaProps = {
  className?: string
  imgClassName?: string
  videoClassName?: string
  cmsImageSize?: PayloadMediaSize
  htmlElement?: ElementType | null
  onClick?: () => void
  onLoad?: () => void
  layout?: 'intrinsic' | 'responsive' | 'fill' | 'fixed'
  ref?: Ref<(null | HTMLImageElement | HTMLVideoElement)>
  objectFit?: 'fill' | 'contain' | 'cover' | 'none'
  useNextImage?: boolean
  sizes?: string
  quality?: number
  mediaFromCMS?: PayloadMediaType & {
    absolutePath?: boolean
  }
  priority?: boolean
  placeholderColor?: 'dark' | 'light'
}

export const Media: React.FC<MediaProps> = (props) => {
  const {
    className,
    mediaFromCMS,
    htmlElement = 'div'
  } = props;

  const isVideo = typeof mediaFromCMS !== 'string' && mediaFromCMS?.mimeType?.includes('video');
  const Tag = htmlElement as ElementType || Fragment;

  return (
    <Tag
      {...htmlElement !== null ? {
        className
      } : {}}
    >
      {isVideo ? (
        <Video {...props} />
      ) : (
        <Image {...props} /> // eslint-disable-line
      )}
    </Tag>
  )
};
