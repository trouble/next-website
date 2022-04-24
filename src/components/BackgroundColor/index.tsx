import React, { CSSProperties } from 'react';
import classes from './index.module.scss';

export const BackgroundColor: React.FC<{
  color?: string
  className?: string
  style?: CSSProperties
  children?: React.ReactNode
}> = (props) => {
  const {
    className,
    children,
    style,
    color
  } = props;

  return (
    <div
      className={[
        classes.backgroundColor,
        className,
      ].filter(Boolean).join(' ')}
      style={{
        ...style,
        backgroundColor: `var(--color-${color})`
      }}
    >
      {children}
    </div>
  )
}
