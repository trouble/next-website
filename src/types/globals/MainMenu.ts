import { LinkType } from '..';
import { MenuDescription } from '../menuBlocks/MenuDescription';
import { MenuFeature } from '../menuBlocks/MenuFeature';
import { MenuLink } from '../menuBlocks/MenuLink';

export type SubmenuColumn = (MenuLink | MenuDescription | MenuFeature)[];

export type MainMenuSubmenu = {
  column1: SubmenuColumn
  enableColumn2?: boolean
  column2?: SubmenuColumn
}

export type MainMenu = {
  items: {
    type: 'subMenu' | 'link'
    label: string
    link: LinkType
    subMenu: MainMenuSubmenu
  }[]
  secondaryItems: {
    link: LinkType
  }[]
}
