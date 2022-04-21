import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Logo } from '../../../components/Logo';
import classes from './index.module.scss';
import Link from 'next/link';
import { useColorTheme } from '../../../providers/ColorTheme';
import { ModalToggler, useModal } from '@faceless-ui/modal';
import { SearchIcon } from '@root/icons/SearchIcon';
import { Hamburger } from '@components/Hamburger';
import { BlockContainer } from '../../BlockContainer';
import { SubsiteNav } from './SubsiteNav';
import { BackgroundColor } from '@components/BackgroundColor';
import { useSubsite } from '@root/providers/Subsite';
import { useWindowInfo } from '@faceless-ui/window-info';
import { PayloadAdminBarProps } from 'payload-admin-bar'
import { AdminBar } from '../AdminBar';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { useResize } from '@root/utilities/useResize';

export const MobileHeader: React.FC<{
  className?: string
  adminBarProps: PayloadAdminBarProps
}> = (props) => {
  const {
    className,
    adminBarProps
  } = props;

  const { subsite } = useSubsite();
  const hasSubsite = Boolean(subsite);

  const {
    setHeaderHeight
  } = useHeaderHeight();

  const {
    headerTextColor,
    setHeaderTextColor,
    colorTheme,
    heroIsInverted
  } = useColorTheme();

  const {
    currentModal,
    oneIsOpen: modalIsOpen,
    closeAll: closeAllModals,
    open: openModal
  } = useModal();

  const containerRef = useRef(null);

  const mainMenuIsOpen = currentModal === 'main-menu';
  const searchIsOpen = currentModal === 'search';

  const renderSubsiteNav = hasSubsite && !mainMenuIsOpen && !searchIsOpen;

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string | undefined>();

  const { size } = useResize(containerRef);

  useEffect(() => {
    if (size) {
      const { height } = size;
      setHeaderHeight(height)
    }
  }, [
    size,
    setHeaderHeight
  ])

  const {
    breakpoints: {
      m: midBreak
    } = {}
  } = useWindowInfo();

  useEffect(() => {
    if (midBreak) {
      let newTextColor;
      let newBGColor;

      if (!modalIsOpen) {
        if (!heroIsInverted) {
          newBGColor = 'white'
          newTextColor = colorTheme;
        } else {
          newBGColor = colorTheme
          newTextColor = 'white';
        }
      }

      if (modalIsOpen) {
        newTextColor = 'white';
        newBGColor = `dark-${colorTheme}`;
      }

      setHeaderBackgroundColor(newBGColor)
      setHeaderTextColor(newTextColor);
    }
  }, [
    modalIsOpen,
    colorTheme,
    heroIsInverted,
    setHeaderTextColor,
    midBreak
  ]);

  const mainMenuOrSearchOpen = mainMenuIsOpen || searchIsOpen;
  const searchIconColor = headerTextColor === 'white' ? colorTheme : headerTextColor;

  return (
    <Fragment>
      <div
        ref={containerRef}
        className={[
          className,
          classes.headerOuter,
        ].filter(Boolean).join(' ')}
      >
        <AdminBar
          adminBarProps={adminBarProps}
        />
        <div
          className={[
            classes.headerInner,
            headerTextColor && classes[headerTextColor],
            mainMenuOrSearchOpen && classes.modalIsOpen
          ].filter(Boolean).join(' ')}
        >
          <BackgroundColor
            className={classes.backgroundColor}
            color={headerBackgroundColor}
          />
          <BlockContainer className={classes.content} >
            <div className={classes.wrapper}>
              <div className={classes.logoNavWrapper}>
                <div className={classes.logoWrapper}>
                  <Link href="/">
                    <a className={classes.logoAnchor}>
                      <Logo />
                    </a>
                  </Link>
                </div>
              </div>
              <div className={classes.controls}>
                <div className={classes.control}>
                  <ModalToggler
                    slug="search"
                    className={[
                      classes.searchButton,
                      mainMenuOrSearchOpen && classes.searchInactive
                    ].filter(Boolean).join(' ')}
                  >
                    <SearchIcon
                      color={searchIconColor}
                      bold
                    />
                  </ModalToggler>
                </div>
                <div className={classes.control}>
                  <button
                    onClick={() => {
                      if (mainMenuOrSearchOpen) closeAllModals();
                      if (!modalIsOpen) openModal('main-menu')
                    }}
                    className={[
                      classes.mainMenuButton,
                      // (searchIsOpen || showSubmenu) && classes.closeInactive
                    ].filter(Boolean).join(' ')}
                  >
                    <Hamburger
                      isOpen={mainMenuOrSearchOpen}
                      color={searchIconColor}
                    />
                  </button>
                </div>
              </div>
            </div>
          </BlockContainer>
        </div >
      </div>
      {renderSubsiteNav && (
        <SubsiteNav
          className={className}
          subsite={subsite}
          headerBackgroundColor={headerBackgroundColor}
          headerTextColor={headerTextColor}
        />
      )}
    </Fragment>
  )
}
