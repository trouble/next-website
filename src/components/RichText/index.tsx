import React from 'react';
import classes from './index.module.scss';
import Serialize, { RichTextOverrides, RichTextRenderers } from './Serialize';

export type RichTextNode = {
  text?: string
  type?: string
  bold?: boolean
  code?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  small?: boolean
  indent?: boolean
  url?: string
  newTab?: boolean
  children?: RichTextNode[]
  relationTo?: 'locations' | string
  value?: Location | unknown
  source?: 'vimeo' | 'youtube' | string
  id?: string
}

export type RichTextType = RichTextNode[];

export const RichText: React.FC<{
  className?: string
  content?: RichTextType
  color?: string
  colorize?: boolean
  overrides?: RichTextOverrides
  customRenderers?: RichTextRenderers
}> = (props) => {
  const {
    className,
    content,
    overrides,
    customRenderers: customRenderersFromProps,
  } = props;

  const customRenderers = {
    ...customRenderersFromProps,
    // underline: (incomingText) => {
    //   return (
    //     <Highlight
    //       text={incomingText}
    //       bold
    //     />
    //   )
    // }
  } as RichTextRenderers;

  if (content) {
    return (
      <div
        className={[
          classes.richText,
          className,
        ].filter(Boolean).join(' ')}
        tabIndex={0}
      >
        <Serialize
          customRenderers={customRenderers}
          overrides={overrides}
          content={content}
        />
      </div>
    );
  }
  return null
};
