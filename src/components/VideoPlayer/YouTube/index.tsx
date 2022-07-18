import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import classes from '../index.module.scss';
import qs from 'qs';
import { useYoutubeApi } from '@root/providers/YoutubeApiProvider';

declare global {
  interface Window { // eslint-disable-line no-unused-vars
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export const YouTubePlayer: React.FC<{
  videoID?: string
  play?: boolean
  setPlay: (playFunc: () => void) => void // eslint-disable-line no-unused-vars
  onPlay: () => void
  className?: string
  autoplay?: boolean
  showControls?: boolean
  setIsVideoLoaded: (isLoaded: boolean) => void // eslint-disable-line no-unused-vars
}> = (props) => {
  const {
    videoID,
    className,
    setPlay,
    onPlay,
    autoplay,
    showControls = true,
    setIsVideoLoaded,
  } = props;

  const { iframeApiReady } = useYoutubeApi();

  const iframeRef = useRef(null);
  const [player, setPlayer] = useState<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  const onReady = useCallback(() => {
    const { current: iframe } = iframeRef;

    if (iframe) {
      const newPlayer = new window.YT.Player(iframe, {
        height: '390',
        width: '640',
        videoId: videoID,
        events: {
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              onPlay();
            }
          },
          onReady: () => {
            setPlayerReady(true)
            setIsVideoLoaded(true);
          }
        },
      });
      setPlayer(newPlayer);
    }
  }, [
    onPlay,
    videoID,
    setIsVideoLoaded,
  ])

  const playVideo = useCallback(() => {
    if (player && player?.playVideo) {
      player.playVideo();
    }
  }, [player])

  useEffect(() => {
    if (iframeApiReady) {
      onReady();
    }
  }, [iframeApiReady, onReady]);

  useEffect(() => {
    if (player && playerReady) {
      setPlay(() => playVideo); // NOTE: must be a function that returns another function
    }
  }, [
    player,
    playerReady,
    setPlay,
    playVideo
  ])

  const playerOptions = {
    playsinline: 1,
    autoplay: autoplay ? 1 : 0,
    controls: showControls ? 1 : 0
  }

  return (
    <Fragment>
      <iframe
        title="YouTube player"
        ref={iframeRef}
        className={[
          classes.iframe,
          className
        ].filter(Boolean).join(' ')}
        src={`https://www.youtube.com/embed/${videoID}?${qs.stringify(playerOptions)}&enablejsapi=1`}
        frameBorder="0"
        allow="autoplay; fullscreen; accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Fragment>
  )
}
