import React, { useCallback, useEffect, useRef } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group"
import classes from './index.module.scss';
import { BackgroundColor } from '@components/BackgroundColor';
import { sanitizePath, usePageTransition } from "./usePageTransition";
import { useRouter } from 'next/router'
// do not mount both pages at the same time (ie 'TransitionGroup'), because their data interfere
// first animate the current page out, then the next page in
// switch transition allows the animation via the 'key' prop on the nested child
// css transition injects transition lifecycle class names into its nested child

const wipeColor = '#000000';

export const pageTransTime = 400; // IMPORTANT: must match scss variables, i.e. var(--page-trans-time)

export const PageTransition: React.FC<{
  children: React.ReactNode
}> = (props) => {
  const { children } = props;
  const hasInitialized = useRef(false); // don't scroll to top on first render
  const { asPath } = useRouter();
  const nodeRef = useRef(null);

  const {
    transitionPath,
  } = usePageTransition();

  const handleTransition = useCallback(() => {
    document.documentElement.style.scrollBehavior = 'auto'; // instantly scroll

    const scrollToTopTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.removeProperty('scroll-behavior');
    }, pageTransTime);

    const { hash } = window?.location;
    let scrollToHashTimer: NodeJS.Timeout;

    if (hash) {
      scrollToHashTimer = setTimeout(() => {
        const hashWithoutMark = hash.substring(1);
        const element = document.getElementById(hashWithoutMark);
        element?.scrollIntoView();
      }, pageTransTime * 2);

      return () => {
        if (scrollToTopTimer) clearTimeout(scrollToTopTimer)
        if (scrollToHashTimer) clearTimeout(scrollToHashTimer)
      }
    }
  }, [])

  useEffect(() => {
    if (hasInitialized.current) {
      handleTransition(); // on every route change
    } else hasInitialized.current = true;
  }, [
    transitionPath,
    handleTransition
  ]);

  return (
    // @ts-ignore TODO: fix this
    <SwitchTransition mode="out-in">
      {/* @ts-ignore TODO: fix this */}
      <CSSTransition
        nodeRef={nodeRef}
        key={JSON.stringify(sanitizePath(asPath))}
        timeout={pageTransTime}
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
          className={classes.pageTransition}
          ref={nodeRef}
        >
          <div className={classes.page}>
            {children}
          </div>
          <div className={classes.wipe}>
            <BackgroundColor color={wipeColor} />
          </div>
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}
