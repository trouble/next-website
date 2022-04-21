import React, { useEffect, useRef, useState } from 'react';
import classes from '../index.module.scss';
import Player from '@vimeo/player';
import qs from 'qs';

export const VimeoPlayer: React.FC<{
  videoID?: string
  setPlay: (playFunc: () => void) => void // eslint-disable-line no-unused-vars
  onPlay: () => void
  className?: string
  showControls?: boolean
  autoplay?: boolean
}> = (props) => {
  const {
    videoID,
    setPlay,
    className,
    onPlay,
    showControls = true,
    autoplay
  } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const { current: iframe } = iframeRef;
    if (iframe) {
      const newPlayer = new Player(iframe);
      newPlayer.on('play', onPlay)
      setPlayer(newPlayer);
    }
  }, [
    onPlay,
    showControls,
    autoplay
  ])

  useEffect(() => {
    if (player && setPlay) {
      setPlay(() => player.play.bind(player))
    }
  }, [
    setPlay,
    player
  ])

  const playerOptions = {
    controls: showControls ? 1 : 0, // NOTE: some videos have may not show controls based on that video's specific settings
    autoplay,
    playsinline: true,
    muted: autoplay // videos must be muted to autoplay in most browsers
  };

  return (
    <iframe
      title="Vimeo player"
      ref={iframeRef}
      className={[
        classes.iframe,
        className
      ].filter(Boolean).join(' ')}
      src={`https://player.vimeo.com/video/${videoID}?${qs.stringify(playerOptions)}`}
      frameBorder="0"
      allowFullScreen
      allow="autoplay; fullscreen; picture-in-picture"
    />
  )
}
