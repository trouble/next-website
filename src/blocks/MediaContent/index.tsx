import React, { Fragment } from 'react';
import { ButtonGroup } from '@components/ButtonGroup';
import { RichText, RichTextType } from '@components/RichText';
import classes from './index.module.scss'
import { Grid, Cell } from '@faceless-ui/css-grid'
import Padding from '@components/Padding';
import { Media } from '@components/Media';
import { BackgroundColor } from '@components/BackgroundColor';
import { AnimateInOut } from '@components/AnimateInOut';
import { VideoPlayer } from '@components/VideoPlayer';
import { useWindowInfo } from '@faceless-ui/window-info';
import cssVariables from '../../cssVariables';
import { BlockID } from '@components/BlockID';
import { LinkGroupFromCMS, PayloadMediaType } from '@root/cms/types';

export type Alignment = 'contentOnLeft' | 'contentOnRight';

export type MediaContentBlockType = {
  blockType?: 'mediaContent'
  blockName?: string
  richText?: RichTextType
  media?: PayloadMediaType
  embeddedVideo?: any // TODO: type this
  invertColors?: boolean
  alignment?: Alignment
  overlap?: boolean
  links?: LinkGroupFromCMS
}

export const MediaContent: React.FC<MediaContentBlockType & {
  id?: string
}> = (props) => {
  const {
    richText,
    media,
    alignment = 'contentOnLeft',
    overlap: overlapFromProps,
    links,
    id,
    embeddedVideo,
    embeddedVideo: {
      embed: embedVideo
    } = {},
    blockName
  } = props;

  const {
    breakpoints: {
      m: midBreak
    } = {}
  } = useWindowInfo()

  // always overlap on mobile, except for instances with embedded videos
  let overlap = overlapFromProps;
  if (midBreak && !embedVideo) overlap = true;
  if (midBreak && embedVideo) overlap = false;

  const blockPaddingSize = !overlap ? 'large' : undefined;

  return (

    <div
      id={`block-${id}`}
      className={[
        classes.mediaContent,
      ].filter(Boolean).join(' ')}
    >
      <BlockID id={blockName || id} />
      <Padding
        top={blockPaddingSize}
        bottom={blockPaddingSize}
      >
        {!overlap && (
          <div className={classes.background}>
            <Grid className={classes.bgGrid}>
              <Cell
                start={alignment === 'contentOnRight' ? 2 : 5}
                startL={alignment === 'contentOnRight' ? 2 : 5}
                cols={11}
                colsL={9}
                startM={2}
                colsM={8}
                className={classes.bgCell}
              >
                <BackgroundColor color="light-gray" />
              </Cell>
            </Grid>
          </div>
        )}
        <Grid className={classes.grid}>
          <Cell
            className={[
              classes.content,
              classes[`content--${alignment}`],
              overlap && classes[`content--overlap`],
            ].filter(Boolean).join(' ')}
            start={alignment === 'contentOnRight' ? 11 : 3}
            startL={alignment === 'contentOnRight' ? 10 : 2}
            cols={5}
            colsL={alignment === 'contentOnRight' ? 4 : 6}
            colsM={overlap ? 7 : 10}
            startM={1}
          >
            <Grid
              className={[
                classes.contentGrid,
                overlap && classes.contentGridOverlap,
              ].filter(Boolean).join(' ')}
            >
              <BackgroundColor color={(midBreak && overlap) ? 'white' : undefined} />
              <Cell
                startM={1}
                colsM={overlap ? 8 : 9}
                className={[
                  classes.contentCell,
                  (midBreak && overlap) && classes.contentCellPaddingBottom
                ].filter(Boolean).join(' ')}
              >
                <Fragment>
                  <AnimateInOut>
                    <RichText content={richText} />
                  </AnimateInOut>
                  <AnimateInOut>
                    <ButtonGroup
                      className={classes.buttonGroup}
                      // the cms does not expose the 'arrow' field on text cta, so we define it here
                      buttons={links?.map(({ link }) => {
                        const {
                          appearance,
                        } = link;

                        return ({
                          linkFromCMS: link,
                          appearance,
                          arrow: appearance === 'text'
                        })
                      })}
                    />
                  </AnimateInOut>
                </Fragment>
              </Cell>
            </Grid>
          </Cell>
          <Cell
            className={[
              classes.media,
              classes[`media--${alignment}`],
            ].filter(Boolean).join(' ')}
            cols={9}
            colsM={10}
            startM={1}
            start={alignment === 'contentOnRight' ? 1 : 8}
          >
            <AnimateInOut>
              {embedVideo && (
                <VideoPlayer  {...embeddedVideo} />
              )}
              {!embedVideo && (
                <Media
                  mediaFromCMS={media}
                  sizes={`(min-width: ${cssVariables.breakpoints.m + 1}px) 50vw, (max-width: ${cssVariables.breakpoints.m}) 100vw`}
                />
              )}
            </AnimateInOut>
          </Cell>
        </Grid>
      </Padding>
    </div>
  )
}
