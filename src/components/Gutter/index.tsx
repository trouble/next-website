import React from 'react';
import classes from './index.module.scss';

export const Gutter: React.FC<{
  left?: boolean
  right?: boolean
  className?: string
  mobileOnly?: boolean
  children: React.ReactNode
}> = (props) => {
  const {
    left,
    right,
    className,
    mobileOnly = true,
    children
  } = props;

  return (
    <div
      className={[
        left && classes.gutterLeft,
        right && classes.gutterRight,
        mobileOnly && classes.mobileOnly,
        className
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div >
  )
}
