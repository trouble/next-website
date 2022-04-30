import React from 'react';
import classes from './index.module.scss';
import { RichText, RichTextType } from '@components/RichText'
import { BlockContainer } from '@root/layout/BlockContainer';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { ButtonGroup } from '@components/ButtonGroup';
import { Media } from '@components/Media';
import { LinkGroupFromCMS, PayloadMediaType } from '@root/cms/types';

export type FullscreenBackgroundHeroType = {
  type?: 'fullscreenBackground'
  links?: LinkGroupFromCMS
  richText?: RichTextType
  backgroundMedia?: PayloadMediaType
  invertColors?: boolean
  useOverlay?: boolean
  publishedDate?: string
}

export const FullscreenBackgroundHero: React.FC<FullscreenBackgroundHeroType> = (props) => {
  const {
    richText,
    links,
    backgroundMedia,
  } = props;

  const hasLinks = links && Array.isArray(links) && links.length > 0;

  return (
    <div
      className={[
        classes.fullscreenBackgroundHero,
      ].filter(Boolean).join(' ')}
    >
      {backgroundMedia && (
        <Media
          mediaFromCMS={backgroundMedia}
          className={classes.backgroundMediaWrap}
          layout="fill"
          objectFit="cover"
          priority
        />
      )}
      <BlockContainer className={classes.content} >
        <Grid>
          <Cell
            cols={10}
            colsM={8}
          >
            <RichText content={richText} />
            {hasLinks && (
              <div className={classes.links}>
                <ButtonGroup linksFromCMS={links} />
              </div>
            )}
          </Cell>
        </Grid>
      </BlockContainer>
    </div>
  )
}
