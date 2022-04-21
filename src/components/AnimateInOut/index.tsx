import React, { useRef } from 'react';
import useIntersection from '../../utilities/useIntersection';
import classes from './index.module.scss';

export const AnimateInOut: React.FC<{
  className?: string
  opacity?: boolean
  translateY?: boolean
  translateX?: boolean
  animateOut?: boolean
  children: React.ReactNode
}> = (props) => {
  const {
    className,
    children,
    opacity = true,
    translateY = true,
    translateX,
    animateOut = false
  } = props;

  const ref = useRef(null);

  const {
    isIntersecting,
    hasIntersected,
  } = useIntersection({
    ref,
    rootMargin: '50px'
  });

  let shouldAnimate = isIntersecting;
  if (animateOut === false && hasIntersected) shouldAnimate = true;

  return (
    <div
      ref={ref}
      className={[
        classes.animateInOut,
        className,
        shouldAnimate && classes.isIntersecting,
        opacity && classes.opacity,
        translateY && classes.translateY,
        translateX && classes.translateX
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  );
};
