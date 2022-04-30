import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '../../../components/Logo';
import classes from './index.module.scss';
import { ModalToggler, useModal } from '@faceless-ui/modal';
import { SearchIcon } from '@root/icons/SearchIcon';
import { Hamburger } from '@components/Hamburger';
import { BlockContainer } from '../../BlockContainer';
// import { SubsiteNav } from './SubsiteNav';
// import { SubsiteMenu } from './SubsiteMenu';
import { useWindowInfo } from '@faceless-ui/window-info'
import { CloseIcon } from '@root/icons/CloseIcon';
import { useScrollInfo } from '@faceless-ui/scroll-info';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { useResize } from '@root/utilities/useResize';
import { useRouter } from 'next/router';
import { Hyperlink } from '@components/Hyperlink';
import { BackgroundColor } from '@components/BackgroundColor';

export const DesktopHeader: React.FC<{
  className?: string
}> = (props) => {
  const {
    className,
  } = props;

  const containerRef = useRef(null);

  const {
    setHeaderHeight,
    reportStickyElement
  } = useHeaderHeight();

  const {
    currentModal,
    oneIsOpen: modalIsOpen,
  } = useModal();

  const { asPath } = useRouter();

  // const [currentSubmenu, setCurrentSubmenu] = useState<undefined>();
  const [showSubmenu, setShowSubmenu] = useState(false);

  const mainMenuIsOpen = currentModal === 'main-menu';
  const searchIsOpen = currentModal === 'search';

  const bindEsc = useCallback((e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setShowSubmenu(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', (e) => bindEsc(e), false);
    return () => document.removeEventListener('keydown', (e) => bindEsc(e), false);
  }, [bindEsc]);

  useEffect(() => {
    if (modalIsOpen) setShowSubmenu(false);
  }, [modalIsOpen])


  useEffect(() => {
    setShowSubmenu(false);
  }, [asPath])

  // const renderSubsiteNav = hasSubsite && !mainMenuIsOpen && !searchIsOpen;

  const {
    breakpoints: {
      m: midBreak
    } = {}
  } = useWindowInfo();

  const {
    y: scrollY
  } = useScrollInfo();

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState<string | undefined>();

  useEffect(() => {
    if (!midBreak) {
      let newBGColor = 'transparent';

      if (!modalIsOpen && scrollY > 0) {
        newBGColor = 'light-gray';
      }

      setHeaderBackgroundColor(newBGColor)
    }
  }, [
    modalIsOpen,
    showSubmenu,
    scrollY,
  ]);

  const { size } = useResize(containerRef);

  useEffect(() => {
    if (size) {
      const { height } = size;
      setHeaderHeight(height);
      reportStickyElement({
        name: 'header',
        height
      })
    }
  }, [
    size,
    setHeaderHeight,
    reportStickyElement
  ])

  return (
    <div
      ref={containerRef}
      className={[
        className,
        classes.headerOuter,
      ].filter(Boolean).join(' ')}
    >
      <div
        className={[
          classes.headerInner,
          // currentSubmenu && classes.subMenuIsOpen,
        ].filter(Boolean).join(' ')}
        onMouseLeave={() => {
          if (!midBreak) setShowSubmenu(false)
        }}
      >
        <BackgroundColor
          className={classes.backgroundColor}
          color={headerBackgroundColor}
        />
        <BlockContainer
          className={[
            classes.content,
            // renderSubsiteNav && classes.hasSubsiteNav
          ].filter(Boolean).join(' ')}
        >
          <div className={classes.wrapper}>
            <div className={classes.logoNavWrapper}>
              <div className={classes.logoWrapper}>
                <Hyperlink
                  href="/"
                  className={classes.logoAnchor}
                  aria-label="Home link"
                >
                  <Logo />
                </Hyperlink>
              </div>
              {/* {renderSubsiteNav && (
                <SubsiteNav
                  className={classes.subsiteNav}
                  currentSubmenu={currentSubmenu}
                  setCurrentSubmenu={setCurrentSubmenu}
                  setShowSubmenu={setShowSubmenu}
                  showSubmenu={showSubmenu}
                  headerBackgroundColor={headerBackgroundColor}
                  headerTextColor={headerTextColor}
                />
              )} */}
            </div>
            <div className={classes.controls}>
              <div className={classes.control}>
                <ModalToggler
                  slug="search"
                  className={[
                    classes.searchButton,
                    mainMenuIsOpen && classes.searchDimmed
                  ].filter(Boolean).join(' ')}
                  htmlAttributes={{
                    'aria-label': 'Open or close search menu'
                  }}
                >
                  {!searchIsOpen ? (
                    <SearchIcon
                      bold
                      color="black"
                    />
                  ) : (
                    <CloseIcon
                      bold
                      color="white"
                    />
                  )}
                </ModalToggler>
              </div>
              <div className={classes.control}>
                <ModalToggler
                  slug="main-menu"
                  className={[
                    classes.mainMenuButton,
                    (searchIsOpen || showSubmenu) && classes.closeDimmed
                  ].filter(Boolean).join(' ')}
                  htmlAttributes={{
                    'aria-label': 'Open or close main menu'
                  }}
                >
                  <Hamburger
                    isOpen={mainMenuIsOpen}
                    color="black"
                  />
                </ModalToggler>
              </div>
            </div>
          </div>
        </BlockContainer>
        {/* <SubsiteMenu
          currentSubmenu={currentSubmenu}
          setShowSubmenu={setShowSubmenu}
          showSubmenu={showSubmenu}
          headerBackgroundColor={headerBackgroundColor}
        /> */}
      </div >
    </div>
  )
}
