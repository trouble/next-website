import { MenuDescriptionType } from '@root/types/menuBlocks';
import React from 'react';
import classes from './index.module.scss';

export const MenuDescription: React.FC<MenuDescriptionType> = (props) => {
  const { content } = props;

  return (
    <div className={classes.menuDescription}>
      {content}
    </div>
  )
}
