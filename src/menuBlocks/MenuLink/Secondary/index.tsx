import { Hyperlink } from '@components/Hyperlink';
import React from 'react';
import { MenuLinkType } from '..';
import classes from './index.module.scss';

export const SecondaryMenuLink: React.FC<MenuLinkType> = (props) => {
  const {
    link,
    link: {
      label
    } = {}
  } = props;

  return (
    <div className={classes.label}>
      <Hyperlink
        className={classes.secondaryMenuLink}
        linkFromCMS={link}
        dimOnHover
      >
        {label}
      </Hyperlink>
    </div>
  )
}
