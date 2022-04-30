import { Modal } from '@faceless-ui/modal';
import React, { Fragment } from 'react';
import classes from './index.module.scss';
import { DesktopMainMenu } from './Desktop';
import { MobileMainMenu } from './Mobile';
import { LinkFromCMS } from '@root/cms/types';
import { MenuLinkType } from '@root/menuBlocks/MenuLink';
import { MenuFeatureType } from '@root/menuBlocks/MenuFeature';
import { MenuDescriptionType } from '@root/menuBlocks/MenuDescription';

export type SubmenuColumn = (MenuLinkType | MenuDescriptionType | MenuFeatureType)[];

export type MainMenuSubmenu = {
  column1: SubmenuColumn
  enableColumn2?: boolean
  column2?: SubmenuColumn
}

export type MainMenuType = {
  items: ({
    type: 'subMenu'
    label: string
    subMenu: MainMenuSubmenu
  } | {
    type: 'link'
    label: string
    link: LinkFromCMS
  })[]
  secondaryItems: {
    link: LinkFromCMS
  }[]
}

export const MainMenu: React.FC = () => {
  return (
    <Modal
      slug="main-menu"
      className={classes.mainMenu}
    >
      {/* @ts-ignore */}
      {({ isOpen }) => (
        <Fragment>
          <DesktopMainMenu />
          <MobileMainMenu isOpen={isOpen} />
        </Fragment>
      )}
    </Modal>
  )
}
