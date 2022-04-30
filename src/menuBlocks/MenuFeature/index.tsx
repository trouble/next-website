import { Hyperlink } from '@components/Hyperlink';
import { Media } from '@components/Media';
import { LinkFromCMS, PayloadMediaType } from '@root/cms/types';
import React from 'react';
import cssVariables from '../../cssVariables';
import classes from './index.module.scss';

export type MenuFeatureType = {
  blockType?: 'menuFeature',
  blockName?: string
  media?: PayloadMediaType
  headline?: string
  link?: LinkFromCMS
}

export const MenuFeature: React.FC<MenuFeatureType> = (props) => {
  const {
    headline,
    media,
    link
  } = props;

  return (
    <div
      className={[
        classes.menuFeature,
      ].filter(Boolean).join(' ')}
    >
      <Hyperlink linkFromCMS={link}>
        <Media
          mediaFromCMS={media}
          cmsImageSize="card"
          sizes={`(min-width: ${cssVariables.breakpoints.m + 1}px) 25vw, (max-width: ${cssVariables.breakpoints.m}) 100vw`}
        />
        <div className={classes.headlineWrapper}>
          <h6 className={classes.headline}>
            {headline}
          </h6>
        </div>
      </Hyperlink>
    </div>
  )
}
