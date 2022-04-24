import React, { Fragment } from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import classes from './index.module.scss'
import { LocationType, Map } from '../Map';
import { VideoPlayer } from '@components/VideoPlayer';
import { Media } from '@components/Media';
import { Hyperlink, HyperlinkProps } from '@components/Hyperlink';
import { RichTextUpload, RichTextUploadNodeType } from './RichTextUpload';
import { RichTextNode } from '.';
import { PayloadMediaType } from '@root/cms/types';

export type RichTextRenderers = {
  [node: string]: (text?: string) => JSX.Element // eslint-disable-line no-unused-vars
};

export type RichTextOverrides = {
  [node: string]: RichTextNode
}

export type Props = {
  customRenderers?: RichTextRenderers
  overrides?: RichTextOverrides
  content?: (RichTextNode & { linkProps?: HyperlinkProps })[]
  uploadContent?: RichTextUploadNodeType
}

const Serialize: React.FC<Props> = (props) => {
  const {
    content,
    overrides,
    customRenderers,
    uploadContent
  } = props;

  if (content) {
    return (
      <Fragment>
        {content.map((incomingNode, i) => {
          const isTextNode = Text.isText(incomingNode);

          const node = {
            ...incomingNode,
            ...overrides?.text || {},
            ...uploadContent
          }

          const {
            text,
            bold,
            code,
            italic,
            underline,
            strikethrough,
            small,
            newTab
          } = node;

          if (isTextNode) {
            // convert straight single quotations to curly
            // "\u201C" is starting double curly
            // "\u201D" is ending double curly
            let sanitizedText = text?.replace(/'/g, "\u2019") // single quotes

            // do not render empty nodes.
            const shouldRender = sanitizedText?.trim();

            if (shouldRender) {
              let Text = (
                <span
                  key={i}
                  dangerouslySetInnerHTML={{ __html: escapeHTML(sanitizedText) }}
                  className={classes.text}
                />
              )

              if (bold) {
                Text = (
                  <strong
                    key={i}
                    className={classes.text}
                  >
                    {sanitizedText}
                  </strong>
                );
              }

              if (code) {
                Text = (
                  <code
                    key={i}
                    className={classes.text}
                  >
                    {sanitizedText}
                  </code>
                );
              }

              if (italic) {
                Text = (
                  <em
                    key={i}
                    className={classes.text}
                  >
                    {sanitizedText}
                  </em>
                );
              }

              if (underline) {
                Text = (
                  <span
                    className={`${classes.text} underline`}
                    style={{ textDecoration: 'underline' }}
                    key={i}
                  >
                    {sanitizedText}
                  </span>
                );

                if (customRenderers && typeof customRenderers.underline === 'function') {
                  Text = (
                    <Fragment key={i}>
                      {customRenderers.underline(sanitizedText)}
                    </Fragment>
                  )
                }
              }

              if (strikethrough) {
                Text = (
                  <span
                    style={{ textDecoration: 'line-through' }}
                    className={classes.text}
                    key={i}
                  >
                    {sanitizedText}
                  </span>
                );
              }

              if (small) {
                Text = (
                  <small
                    className={classes.text}
                    key={i}
                  >
                    {sanitizedText}
                  </small>
                );
              }

              return Text;
            }

            return null;
          }

          if (node) {
            switch (node.type) {
              case 'h1':
                return (
                  <h1 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h1>
                );

              case 'h2':
                return (
                  <h2 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h2>
                );

              case 'h3':
                return (
                  <h3 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h3>
                );

              case 'h4':
                return (
                  <h4 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h4>
                );

              case 'h5':
                return (
                  <h5 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h5>
                );

              case 'h6':
                return (
                  <h6 key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </h6>
                );

              case 'quote':
                return (
                  <blockquote key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </blockquote>
                );

              case 'ul':
                return (
                  <ul key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </ul>
                );

              case 'ol':
                return (
                  <ol key={i}>
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </ol>
                );

              case 'li':
                const hasListChildren = node.children ? node.children.find((child) => child?.type && ['ul', 'ol'].includes(child.type)) : false;
                return (
                  <li
                    key={i}
                    style={{ listStyle: hasListChildren ? 'none' : undefined }}
                  >
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </li>
                );

              case 'indent':
                return (
                  <div
                    key={i}
                    className={classes.indent}
                  >
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </div>
                );

              case 'hr':
                return (
                  <hr className={classes.hr} />
                );

              case 'link':
                return (
                  // eslint-disable-next-line react/jsx-no-target-blank
                  <Hyperlink
                    className={classes.anchor}
                    dimOnHover
                    underline
                    newTab={newTab}
                    href={escapeHTML(node.url)}
                    key={i}
                  >
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </Hyperlink>
                );

              case 'upload': {
                const {
                  relationTo,
                } = node;

                if (relationTo === 'media') {
                  return (
                    <RichTextUpload
                      key={i}
                      node={node as RichTextUploadNodeType}
                    />
                  )
                }
              }

              case 'video': {
                const {
                  source,
                  id: videoID
                } = node;

                if (source === 'vimeo' || source === 'youtube') {
                  return (
                    <VideoPlayer
                      key={i}
                      platform={source}
                      videoID={videoID}
                    />
                  )
                }

                return null;
              }

              case 'relationship':
                const {
                  relationTo,
                  value,
                } = node;

                if (relationTo === 'locations') {
                  return (
                    <Map
                      key={i}
                      locations={[value as LocationType]}
                    />
                  );
                }

                if (relationTo === 'media') {
                  return (
                    <Media
                      layout="intrinsic"
                      quality={75}
                      key={i}
                      mediaFromCMS={value as PayloadMediaType}
                    />
                  )
                }

                return null;

              case 'span':
                return (
                  <span
                    key={i}
                    className={classes.span}
                  >
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </span>
                );

              default:
                return (
                  <p
                    key={i}
                    className={classes.paragraph}
                  >
                    <Serialize
                      customRenderers={customRenderers}
                      overrides={overrides}
                      content={node.children}
                    />
                  </p>
                );
            }
          }

          return null;

        })}
      </Fragment>
    )
  }

  return null;
};

export default Serialize;
