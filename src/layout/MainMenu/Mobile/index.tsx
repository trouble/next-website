import { useGlobals } from '@root/providers/Globals';
import React, { useEffect, useRef, useState } from 'react';
import { BlockContainer } from '../../BlockContainer';
import classes from './index.module.scss';
import { SubMenu, SubMenuType } from './SubMenu';
import { BackgroundColor } from '@components/BackgroundColor';
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { MainNav } from './MainNav';
import { useHeaderHeight } from '@root/providers/HeaderHeight';

export const MobileMainMenu: React.FC<{
  isOpen: boolean
}> = (props) => {
  const { isOpen } = props;
  const nodeRef = useRef(null);

  const {
    mainMenu: {
      items,
    } = {}
  } = useGlobals();

  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenuType | undefined>(() => {
    const firstItem = items?.[0];
    if (firstItem && firstItem.type === 'subMenu') {
      return firstItem.subMenu;
    }
  }); // TODO: type this
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [animationKey, setAnimationKey] = useState<'mainNav' | 'submenu'>('mainNav');
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current === true) {
      if (isOpen && !showSubmenu) {
        setAnimationKey('mainNav')
      }
      if (isOpen && showSubmenu) {
        setAnimationKey('submenu')
      }
      if (!isOpen) {
        setAnimationKey('mainNav')
        setShowSubmenu(false);
      }
    }
    hasInitialized.current = true
  }, [
    isOpen,
    currentSubMenu,
    showSubmenu
  ]);

  const { totalHeaderHeight } = useHeaderHeight();

  return (
    <div
      className={classes.mobileMainMenu}
      style={{
        paddingTop: totalHeaderHeight
      }}
    >
      <BackgroundColor color="black" />
      <BlockContainer className={classes.blockContainer}>
        {/* @ts-ignore TODO: fix this */}
        <SwitchTransition mode="out-in">
          {/* @ts-ignore TODO: fix this */}
          <CSSTransition
            nodeRef={nodeRef}
            appear
            key={animationKey}
            timeout={750}
            classNames={{
              appear: classes.appear,
              appearActive: classes.appearActive,
              appearDone: classes.appearDone,
              enter: classes.enter,
              enterActive: classes.enterActive,
              enterDone: classes.enterDone,
              exit: classes.exit,
              exitActive: classes.exitActive,
              exitDone: classes.exitDone,
            }}
          >
            <div
              ref={nodeRef}
              className={classes.menuTransition}
            >
              {animationKey === 'mainNav' && (
                <MainNav
                  setShowSubmenu={setShowSubmenu}
                  setCurrentSubMenu={setCurrentSubMenu}
                />
              )}
              {animationKey === 'submenu' && (
                <SubMenu
                  currentSubmenu={currentSubMenu}
                  setShowSubmenu={setShowSubmenu}
                />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </BlockContainer>
    </div >
  )
}
