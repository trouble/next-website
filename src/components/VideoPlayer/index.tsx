import React, { useState, useReducer, useCallback, useEffect } from 'react';
import { Play } from '@root/icons/Play';
import classes from './index.module.scss';
import { Media } from '@components/Media';
import { VimeoPlayer } from './Vimeo';
import { YouTubePlayer } from './YouTube';
import { PayloadMediaType } from '@root/cms/types';

// const youtubeID = 'OEFAgWQ_Gvg';
const vimeoID = '367107968';

const playCountReducer = (state: number, action: string) => {
  let newCount = state;
  if (action === 'tick') {
    newCount = state + 1
  }

  if (action === 'reset') {
    newCount = 0;
  }

  return newCount;
}

type Play = () => void

export const VideoPlayer: React.FC<{
  platform?: 'vimeo' | 'youtube'
  videoID?: string
  aspectRatio?: number
  poster?: PayloadMediaType
  autoplay?: boolean
  showControls?: boolean
}> = (props) => {
  const {
    platform = 'vimeo',
    videoID = vimeoID,
    aspectRatio,
    poster,
    autoplay,
    showControls
  } = props;

  const [play, setPlay] = useState<() => void>();
  const [playCount, dispatchPlayCount] = useReducer(playCountReducer, 0);

  const onPlay = useCallback(() => {
    dispatchPlayCount('tick');
  }, [])

  useEffect(() => {
    return () => {
      dispatchPlayCount('reset');
    }
  }, []);

  return (
    <div
      className={classes.videoPlayer}
      style={{
        paddingTop: aspectRatio ? `${aspectRatio}%` : '56.25%' // 16:9
      }}
    >
      {platform === 'youtube' && (
        <YouTubePlayer
          videoID={videoID}
          onPlay={onPlay}
          setPlay={setPlay}
          autoplay={autoplay}
          showControls={showControls}
        />
      )}
      {platform === 'vimeo' && (
        <VimeoPlayer
          videoID={videoID}
          onPlay={onPlay}
          setPlay={setPlay}
          autoplay={autoplay}
          showControls={showControls}
        />
      )}
      <button
        className={[
          classes.posterWrapper,
          (!autoplay && poster && playCount === 0) && classes.showPoster
        ].filter(Boolean).join(' ')}
        onClick={play}
        aria-label="Play video"
      >
        {poster && (
          <Media
            className={classes.poster}
            imgClassName={classes.posterImg}
            cmsImageSize="hero"
            layout="fill"
            mediaFromCMS={poster}
          />
        )}
        <div className={classes.playButton}>
          <Play
            color="white"
            size="huge"
          />
        </div>
      </button>
    </div>
  )
}
