import { Button } from '@components/Button';
import React from 'react';
import { MenuLinkType } from '..';
import classes from './index.module.scss';

export const ArrowMenuLink: React.FC<MenuLinkType> = (props) => {
  const {
    link,
  } = props;

  return (
    <Button
      appearance="text"
      arrow
      className={classes.menuLink}
      linkFromCMS={link}
      size="small"
    />
  )
}
