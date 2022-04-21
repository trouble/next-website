import { Hyperlink } from '@components/Hyperlink';
import { FooterMenuLinkType } from '@root/types/globals/Footer';
import React from 'react';
import classes from './index.module.scss';

export const SecondaryMenuLink: React.FC<FooterMenuLinkType> = (props) => {
  const {
    label,
    useLink,
    link,
  } = props;

  if (useLink) {
    return (
      <Hyperlink
        className={classes.secondaryMenuLink}
        linkFromCMS={link}
        dimOnHover
      >
        <h5 className={classes.label}>
          {label}
        </h5>
      </Hyperlink>
    )
  }

  return (
    <h5 className={classes.label}>
      {label}
    </h5>
  )
}
