import { Hyperlink } from '@components/Hyperlink';
import { FooterMenuLinkType } from '@root/types/globals/Footer';
import React from 'react';
import classes from './index.module.scss';

export const TertiaryMenuLink: React.FC<FooterMenuLinkType> = (props) => {
  const {
    label,
    useLink,
    link,
  } = props;

  if (useLink) {
    return (
      <Hyperlink
        className={classes.tertiaryMenuLink}
        linkFromCMS={link}
        dimOnHover
      >
        {label}
      </Hyperlink>
    )
  }

  return (
    <span>
      {label}
    </span>
  )
}
