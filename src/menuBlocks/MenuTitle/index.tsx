import React from 'react';
import classes from './index.module.scss';

export type MenuTitleType = {
  blockType?: 'menuTitle',
  blockName?: string
  title?: string
}

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
