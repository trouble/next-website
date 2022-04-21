import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';
import { Grid, Cell } from '@faceless-ui/css-grid'
import { Media } from '@components/Media';
import { RichText } from '@components/RichText';
import classes from '../index.module.scss';
import { VideoPlayer } from '../../../components/VideoPlayer'
import { AnimateInOut } from '@components/AnimateInOut';
import { MediaBlockType } from '..';

export const NormalMediaBlock: React.FC<MediaBlockType & {
  id?: string
}> = (props) => {
  const {
    media,
    caption,
    useVimeo,
    aspectRatio,
    vimeoID,
    id
  } = props;

  return (
    <BlockContainer
      id={id}
      className={classes.mediaBlock}
    >
      <Grid>
        <Cell
          cols={12}
          colsM={8}
        >
          <AnimateInOut>
            {!useVimeo && (
              <Media
                className={classes.media}
                cmsImageSize="hero"
                mediaFromCMS={media}
              />
            )}
            {useVimeo && (
              <VideoPlayer
                platform="vimeo"
                aspectRatio={aspectRatio}
                videoID={vimeoID}
                poster={media}
              />
            )}
          </AnimateInOut>
          <AnimateInOut>
            {caption && (
              <div className={classes.caption}>
                {caption && (
                  <RichText content={caption} />
                )}
              </div>
            )}
          </AnimateInOut>
        </Cell>
      </Grid>
    </BlockContainer>
  )
}
