import React from 'react';
import { TertiaryMenuLink } from './Tertiary';
import { PrimaryMenuLink } from './Primary';
import { SecondaryMenuLink } from './Secondary';
import { FooterMenuLinkType } from '@root/types/globals/Footer';

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
