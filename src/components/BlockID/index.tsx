import { useHeaderHeight } from '@root/providers/HeaderHeight';
import React from 'react';
import classes from './index.module.scss';
import kebabCase from 'lodash.kebabcase';

// places an absolutely positioned div above the block at a distance equal to the header height
// this keeps native hash scrolling and prevents block content from hiding beneath fixed header elements

export const BlockID: React.FC<{
  id?: string
}> = (props) => {
  const { id } = props;

  const { totalHeaderHeight } = useHeaderHeight();

  return (
    <div
      id={kebabCase(id)}
      className={classes.blockID}
      style={{
        top: `-${totalHeaderHeight}px`
      }}
    />
  )
}
