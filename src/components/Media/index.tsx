import React, { ElementType, Fragment, Ref } from 'react';
import { Video } from './Video';
import { Image } from './Image';
import { PayloadMediaType } from '@root/types/Media';

export type MediaType = {
  className?: string
  imgClassName?: string
  videoClassName?: string
  cmsImageSize?: string
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

export const Media: React.FC<MediaType> = (props) => {
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
