import { BlockID } from '@components/BlockID';
import React from 'react';
import { FullscreenMediaBlock } from './Fullscreen';
import { NormalMediaBlock } from './Normal';
import { WideMediaBlock } from './Wide';
import classes from './index.module.scss';
import { RichTextType } from '@components/RichText';
import { PayloadMediaType } from '@root/types/Media';

export type MediaBlockType = {
  blockType?: 'media'
  blockName?: string
  media?: PayloadMediaType
  caption?: RichTextType
  size?: 'normal' | 'wide' | 'fullscreen'
  useVimeo?: boolean
  vimeoID?: string
  aspectRatio?: number
}

const sizes = {
  normal: NormalMediaBlock,
  wide: WideMediaBlock,
  fullscreen: FullscreenMediaBlock,
}

export const MediaBlock: React.FC<MediaBlockType & {
  id?: string
}> = (props) => {
  const {
    size,
    id,
    blockName
  } = props;

  if (size) {
    const Size = sizes[size];

    if (Size) {
      return (
        <div
          id={`block-${id}`}
          className={classes.mediaBlock}
        >
          <BlockID id={blockName || id} />
          <Size {...props} />
        </div>
      );
    }
  }

  return null
}
