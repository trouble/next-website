import { Hyperlink } from '@components/Hyperlink';
import { MenuLinkType } from '@root/types/menuBlocks';
import React from 'react';
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
