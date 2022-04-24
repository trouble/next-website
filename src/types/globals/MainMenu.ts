import { PayloadLink } from '../../cms/types';
import { MenuDescriptionType } from '../menuBlocks/MenuDescription';
import { MenuFeature } from '../menuBlocks/MenuFeature';
import { MenuLinkType } from '../menuBlocks/MenuLink';

export type SubmenuColumn = (MenuLinkType | MenuDescriptionType | MenuFeature)[];

export type MainMenuSubmenu = {
  column1: SubmenuColumn
  enableColumn2?: boolean
  column2?: SubmenuColumn
}

export type MainMenuType = {
  items: {
    type: 'subMenu' | 'link'
    label: string
    link: PayloadLink
    subMenu: MainMenuSubmenu
  }[]
  secondaryItems: {
    link: PayloadLink
  }[]
}
