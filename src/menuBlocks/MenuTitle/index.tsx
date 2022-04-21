import { MenuTitleType } from '@root/types/menuBlocks';
import React from 'react';
import classes from './index.module.scss';

export const MenuTitle: React.FC<MenuTitleType> = (props) => {
  const { title } = props;

  if (title) {
    return (
      <h4 className={classes.menuTitle}>
        {title}
      </h4>
    )
  }
  return null;
}
