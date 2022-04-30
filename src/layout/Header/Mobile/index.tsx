import React, { Fragment, useEffect, useRef } from 'react';
import { Logo } from '../../../components/Logo';
import classes from './index.module.scss';
import Link from 'next/link';
import { ModalToggler, useModal } from '@faceless-ui/modal';
import { SearchIcon } from '@root/icons/SearchIcon';
import { Hamburger } from '@components/Hamburger';
import { BlockContainer } from '../../BlockContainer';
import { BackgroundColor } from '@components/BackgroundColor';
import { PayloadAdminBarProps } from 'payload-admin-bar'
import { AdminBar } from '../AdminBar';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { useResize } from '@root/utilities/useResize';

export const MobileHeader: React.FC<{
  className?: string
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const {
    className,
    adminBarProps
  } = props;

  const {
    setHeaderHeight
  } = useHeaderHeight();

  const {
    currentModal,
    oneIsOpen: modalIsOpen,
    closeAll: closeAllModals,
    open: openModal
  } = useModal();

  const containerRef = useRef(null);

  const mainMenuIsOpen = currentModal === 'main-menu';
  const searchIsOpen = currentModal === 'search';

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

  const mainMenuOrSearchOpen = mainMenuIsOpen || searchIsOpen;

  return (
    <Fragment>
      <div
        ref={containerRef}
        className={[
          className,
          classes.headerOuter,
        ].filter(Boolean).join(' ')}
      >
        {adminBarProps && (
          <AdminBar
            adminBarProps={adminBarProps}
          />
        )}
        <div
          className={[
            classes.headerInner,
            mainMenuOrSearchOpen && classes.modalIsOpen
          ].filter(Boolean).join(' ')}
        >
          <BackgroundColor
            className={classes.backgroundColor}
            color="light-gray"
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
                      color="black"
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
                      color="black"
                    />
                  </button>
                </div>
              </div>
            </div>
          </BlockContainer>
        </div >
      </div>
    </Fragment>
  )
}
