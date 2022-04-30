import React from 'react';
import { Media } from '@components/Media';
import classes from './index.module.scss';
import { RichText, RichTextNode, RichTextType } from '..';
import { Hyperlink, HyperlinkProps } from "@components/Hyperlink";
import { LinkFromCMS, PayloadMediaType } from '@root/cms/types';

export type RichTextUploadNodeType = {
  fields: {
    caption?: RichTextType
    alignment?: 'left' | 'center' | 'right'
    link?: LinkFromCMS
    enableLink?: boolean
  },
  value?: PayloadMediaType,
  relationTo: string,
} & RichTextNode

export type Props = {
  node: RichTextUploadNodeType
  className?: string
}

export const RichTextUpload: React.FC<Props> = (props) => {
  const {
    node: {
      fields,
      value,
    },
    className
  } = props;

  let Wrap: React.ComponentType<HyperlinkProps> | string = 'div'

  const styles: React.CSSProperties = {}

  switch (fields?.alignment) {
    case 'left':
      styles.float = 'left'
      break;

    case 'right':
      styles.float = 'right'
      break;

    case 'center':
      styles.margin = 'auto'
      break;
  }

  const wrapProps: HyperlinkProps = {} as HyperlinkProps;

  if (fields?.enableLink) {
    Wrap = Hyperlink
    wrapProps.linkFromCMS = fields?.link
  }

  return (
    <div
      style={styles}
      className={[
        className,
        classes[`alignment-${fields?.alignment}`],
      ].filter(Boolean).join(' ')}
    >
      <Wrap linkFromCMS={fields?.link}>
        <Media
          layout="intrinsic"
          quality={75}
          mediaFromCMS={value}
        />
        {fields?.caption &&
          <RichText
            content={fields?.caption}
            className={classes.caption}
          />
        }
      </Wrap>
    </div>
  )
}

export default RichTextUpload;
