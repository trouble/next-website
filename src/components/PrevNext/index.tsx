import React from 'react';
import classes from './index.module.scss';
import { BlockContainer } from '@root/layout/BlockContainer';
import { Hyperlink } from '@components/Hyperlink';
import { Grid, Cell } from '@faceless-ui/css-grid'
import Margin from '@components/Margin';
import { Media } from '@components/Media';
import { Button } from '@components/Button';
import { DocFromCMS, PayloadPostCategory } from '@root/cms/types';
import { collectionLabels } from '@root/cms/collectionLabels';

export const PrevNext: React.FC<{
  prev?: DocFromCMS | null
  next?: DocFromCMS | null
  className?: string
  collection?: string
  buttonLabel?: string
  category?: PayloadPostCategory
}> = (props) => {
  const {
    prev,
    next,
    className,
    collection = 'posts',
    buttonLabel = 'Read post'
  } = props;

  const prevURL = `/${collection}/${prev?.slug}`;
  const nextURL = `/${collection}/${next?.slug}`;

  const {
    singular,
  } = collectionLabels?.[collection || ''] || {};

  return (
    <div
      className={[
        classes.prevNext,
        className
      ].filter(Boolean).join(' ')}
    >
      <BlockContainer>
        <Margin bottom="large">
          <Grid>
            <Cell
              cols={6}
              colsM={8}
            >
              {prev && (
                <div className={classes.card}>
                  <div className={classes.cardLeader}>
                    {`Previous ${singular}:`}
                  </div>
                  {prev?.meta?.image && (
                    <Hyperlink
                      href={prevURL}
                      className={classes.image}
                    >
                      <Media
                        mediaFromCMS={prev?.meta?.image}
                        cmsImageSize="card"
                        layout="responsive"
                      />
                    </Hyperlink>
                  )}
                  <div className={classes.content}>
                    <Hyperlink
                      href={prevURL}
                      dimOnHover
                    >
                      <h5 className={classes.title}>
                        {prev?.meta?.title || prev?.title}
                      </h5>
                    </Hyperlink>
                    {prev?.meta?.description && (
                      <div className={classes.description}>
                        {prev?.meta?.description}
                      </div>
                    )}
                    <div className={classes.button}>
                      <Button
                        appearance="text"
                        label={buttonLabel}
                        arrow
                        href={prevURL}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Cell>
            <Cell
              cols={6}
              start={!prev ? 1 : undefined}
              colsM={8}
            >
              {next && (
                <div className={classes.card}>
                  <div className={classes.cardLeader}>
                    {`Next ${singular}:`}
                  </div>
                  {next?.meta?.image && (
                    <Hyperlink
                      href={nextURL}
                      className={classes.image}
                    >
                      <Media
                        mediaFromCMS={next?.meta?.image}
                        cmsImageSize="card"
                        layout="responsive"
                      />
                    </Hyperlink>
                  )}
                  <div className={classes.content}>
                    <Hyperlink
                      href={nextURL}
                      dimOnHover
                    >
                      <h5 className={classes.title}>
                        {next?.meta?.title || next?.title}
                      </h5>
                    </Hyperlink>
                    {next?.meta?.description && (
                      <div className={classes.description}>
                        {next?.meta?.description}
                      </div>
                    )}
                    <div className={classes.button}>
                      <Button
                        href={nextURL}
                        appearance="text"
                        label={buttonLabel}
                        arrow
                      />
                    </div>
                  </div>
                </div>
              )}
            </Cell>
          </Grid>
        </Margin>
      </BlockContainer>
    </div>
  )
}
