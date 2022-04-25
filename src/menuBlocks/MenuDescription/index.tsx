import React from 'react';
import classes from './index.module.scss';

export type MenuDescriptionType = {
  blockType?: 'menuDescription',
  blockName?: string
  content?: string
}

export const MenuDescription: React.FC<MenuDescriptionType> = (props) => {
  const { content } = props;

  return (
    <div className={classes.menuDescription}>
      {content}
    </div>
  )
}
