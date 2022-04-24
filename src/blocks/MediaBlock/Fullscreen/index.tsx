import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';
import { Grid, Cell } from '@faceless-ui/css-grid'
import { Media } from '@components/Media';
import { RichText } from '@components/RichText';
import classes from '../index.module.scss';
import { VideoPlayer } from '../../../components/VideoPlayer'
import { AnimateInOut } from '@components/AnimateInOut';
import { MediaBlockType } from '..';

export const FullscreenMediaBlock: React.FC<MediaBlockType & {
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
      className={classes.mediaBlock}
    >
      <Cell
        cols={14}
        colsM={8}
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
              aspectRatio={aspectRatio}
              platform={platform}
              videoID={videoID}
              poster={media}
            />
          )}
        </AnimateInOut>
      </Cell>
      {caption && (
        <BlockContainer className={classes.caption}>
          <Grid>
            <Cell
              cols={12}
              colsM={8}
            >
              <AnimateInOut>
                {caption && (
                  <RichText content={caption} />
                )}
              </AnimateInOut>
            </Cell>
          </Grid>
        </BlockContainer>
      )}
    </div>
  )
}
