import React, { useEffect, useRef, useState } from 'react';
import classes from './index.module.scss'
import { Media, MediaProps } from '..';

export const Video: React.FC<MediaProps> = (props) => {
  const {
    videoClassName,
    mediaFromCMS,
    onClick,
    objectFit,
    placeholderColor = 'light'
  } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [showFallback] = useState<boolean>();

  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (mediaFromCMS && typeof mediaFromCMS !== 'string') {
    const {
      filename,
      fallback,
      absolutePath,
    } = mediaFromCMS

    if (showFallback && typeof fallback !== 'string') {
      return (
        <Media
          {...props}
          mediaFromCMS={fallback}
        />
      )
    }

    return (
      <video
        playsInline
        autoPlay
        muted
        loop
        controls={false}
        className={[
          placeholderColor && classes[`placeholder-color-${placeholderColor}`],
          classes.video,
          videoClassName,
          objectFit === 'cover' && classes.cover
        ].filter(Boolean).join(' ')}
        onClick={onClick}
        ref={videoRef}
      >
        <source src={absolutePath ? filename : `${process.env.NEXT_PUBLIC_API_URL}/media/${filename}`} />
      </video>
    );
  };

  return null
}
