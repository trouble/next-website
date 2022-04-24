import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';
import { Grid, Cell } from '@faceless-ui/css-grid'
import { Media } from '@components/Media';
import { RichText } from '@components/RichText';
import classes from '../index.module.scss';
import { VideoPlayer } from '../../../components/VideoPlayer'
import { AnimateInOut } from '@components/AnimateInOut';
import { MediaBlockType } from '..';

export const WideMediaBlock: React.FC<MediaBlockType & {
  id?: string
}> = (props) => {
  const {
    media,
    caption,
    embedVideo,
    platform,
    videoID,
    aspectRatio,
    id
  } = props;

  return (
    <div
      id={id}
      className={[
        classes.mediaBlock,
        classes.wideMediaBlock
      ].filter(Boolean).join(' ')}
    >
      <Grid>
        <Cell
          cols={14}
          start={3}
          startL={2}
          colsL={13}
          colsM={8}
          startM={1}
        >
          <AnimateInOut>
            {!embedVideo && (
              <Media
                mediaFromCMS={media}
                cmsImageSize="hero"
              />
            )}
            {embedVideo && (
              <VideoPlayer
                platform={platform}
                aspectRatio={aspectRatio}
                videoID={videoID}
                poster={media}
              />
            )}
          </AnimateInOut>
        </Cell>
      </Grid>
      {caption && (
        <BlockContainer className={`${classes.caption} ${classes.wideCaption}`}>
          <Grid>
            <Cell
              cols={14}
              colsM={8}
            >
              {caption && (
                <RichText content={caption} />
              )}
            </Cell>
          </Grid>
        </BlockContainer>
      )}
    </div>
  )
}
