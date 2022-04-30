import { BackgroundColor } from '@components/BackgroundColor';
import React from 'react';
import { BlockContainer } from '../../BlockContainer';
import classes from './index.module.scss';

export const SkipToContent: React.FC = () => {
  return (
    <div className={classes.skipToContent}>
      <BackgroundColor color="black" />
      <BlockContainer
        tabIndex={-1}
        className={classes.buttonWrapper}
      >
        <a
          className={classes.skipMenuButton}
          href="#page-content"
        >
          <small>
            Skip to content
          </small>
        </a>
      </BlockContainer>
    </div>
  )
}
