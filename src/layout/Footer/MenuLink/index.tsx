import React from 'react';
import { TertiaryMenuLink } from './Tertiary';
import { PrimaryMenuLink } from './Primary';
import { SecondaryMenuLink } from './Secondary';
import { LinkFromCMS } from '@root/cms/types';

export type FooterMenuLinkType = {
  appearance?: 'primary' | 'secondary' | 'tertiary'
  label?: string
  useLink?: boolean
  link?: LinkFromCMS
}

const appearances = {
  primary: PrimaryMenuLink,
  secondary: SecondaryMenuLink,
  tertiary: TertiaryMenuLink
}

export const MenuLink: React.FC<FooterMenuLinkType> = (props) => {
  const {
    appearance,
  } = props;

  const MenuLinkAppearance = appearance ? appearances?.[appearance] : null;

  if (MenuLinkAppearance) {
    return (
      <MenuLinkAppearance
        {...props}
      />
    )
  }

  return null;
}
