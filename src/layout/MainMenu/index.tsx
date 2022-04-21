import { Modal } from '@faceless-ui/modal';
import React, { Fragment } from 'react';
import classes from './index.module.scss';
import { DesktopMainMenu } from './Desktop';
import { MobileMainMenu } from './Mobile';

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
