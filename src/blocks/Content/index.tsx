import { ButtonGroup } from '@components/ButtonGroup';
import { RichText, RichTextType } from '@components/RichText';
import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';
import classes from './index.module.scss'
import { Grid, Cell } from '@faceless-ui/css-grid'
import Padding from '@components/Padding';
import { AnimateInOut } from '@components/AnimateInOut';
import { BlockID } from '@components/BlockID';
import { LinkGroupFromCMS } from '@root/cms/types';
import { BackgroundColor } from '@components/BackgroundColor';

export type ColumnWidth = 'oneThird' | 'half' | 'twoThirds' | 'full';

export type Alignment = 'left' | 'center' | 'right';

export type Column = {
  richText?: RichTextType
  width?: ColumnWidth
  alignment?: Alignment
  links?: LinkGroupFromCMS
}

export type ContentBlockType = {
  blockType?: 'content'
  blockName?: string
  columns?: Column[]
  enableGrayBackground?: boolean
}

export const ContentBlock: React.FC<ContentBlockType & {
  id?: string
}> = (props) => {
  const {
    columns,
    enableGrayBackground,
    id,
    blockName
  } = props;

  const hasColumns = columns && Array.isArray(columns) && columns.length > 0;

  return (
    <div
      id={`block-${id}`}
      className={classes.contentBlock}
    >
      <BlockID id={blockName || id} />
      {enableGrayBackground && (
        <AnimateInOut className={classes.background}>
          <Grid className={classes.backgroundGrid}>
            <Cell
              cols={12}
              className={classes.backgroundCell}
            >
              <BackgroundColor color="light-gray" />
            </Cell>
          </Grid>
        </AnimateInOut>
      )}
      <Padding
        top={enableGrayBackground ? 'medium' : undefined}
        bottom={enableGrayBackground ? 'medium' : undefined}
        className={classes.content}
      >
        <BlockContainer>
          <Grid>
            {hasColumns && columns?.map((column, index) => {
              const {
                width,
                richText,
                links
              } = column;

              const hasLinks = links && Array.isArray(links) && links.length > 0;

              let cols = 12;
              let colsM = 8;

              if (width === 'oneThird') {
                cols = 4;
                colsM = 8;
              }

              if (width === 'half') {
                cols = 6;
                colsM = 8;
              }

              if (width === 'twoThirds') {
                cols = 8;
                colsM = 8;
              }

              return (
                <Cell
                  key={index}
                  className={classes.cell}
                  cols={cols}
                  colsM={colsM}
                >
                  <AnimateInOut>
                    <RichText content={richText} />
                    {hasLinks && (
                      <ButtonGroup
                        className={classes.buttonGroup}
                        // the cms does not expose the 'appearance' field, so we define as 'text' with arrow here
                        buttons={links?.map(({ link }) => ({
                          className: classes.button,
                          linkFromCMS: link,
                          appearance: 'text',
                          arrow: true
                        }))}
                      />
                    )}
                  </AnimateInOut>
                </Cell>
              )
            })}
          </Grid>
        </BlockContainer>
      </Padding>
    </div>
  )
}
