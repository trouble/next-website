import { Hyperlink } from '@components/Hyperlink';
import { MenuLinkType } from '@root/types/menuBlocks';
import React from 'react';
import classes from './index.module.scss';

export const PrimaryMenuLink: React.FC<MenuLinkType> = (props) => {
  const {
    link,
    link: {
      label
    } = {}
  } = props;

  return (
    <h4 className={classes.label}>
      <Hyperlink
        className={classes.menuLink}
        linkFromCMS={link}
        dimOnHover
      >
        {label}
      </Hyperlink>
    </h4>
  )
}
