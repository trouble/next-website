import { Hyperlink } from '@components/Hyperlink';
import { FooterMenuLinkType } from '@root/types/globals/Footer';
import React from 'react';
import classes from './index.module.scss';

export const PrimaryMenuLink: React.FC<FooterMenuLinkType> = (props) => {
  const {
    label,
    useLink,
    link,
  } = props;

  if (useLink) {
    return (
      <Hyperlink
        className={classes.menuLink}
        linkFromCMS={link}
        dimOnHover
      >
        <h4 className={classes.label}>
          {label}
        </h4>
      </Hyperlink>
    )
  }

  return (
    <h4 className={classes.label}>
      {label}
    </h4>
  )
}
