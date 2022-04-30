import React from 'react';
import { ArrowMenuLink } from './Arrow';
import { PrimaryMenuLink } from './Primary';
import { SecondaryMenuLink } from './Secondary';
import { LinkFromCMS } from "../../cms/types"

export type MenuLinkAppearances = 'primary' | 'secondary' | 'arrow';

export type MenuLinkType = {
  blockType?: 'menuLink',
  blockName?: string
  content?: string
  appearance?: MenuLinkAppearances
  link?: LinkFromCMS
}

const appearances = {
  primary: PrimaryMenuLink,
  secondary: SecondaryMenuLink,
  arrow: ArrowMenuLink
}

export const MenuLink: React.FC<MenuLinkType> = (props) => {
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
