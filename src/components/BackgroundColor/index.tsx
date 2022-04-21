import React, { CSSProperties } from 'react';
import classes from './index.module.scss';

export const BackgroundColor: React.FC<{
  color?: string
  className?: string
  style?: CSSProperties
}> = (props) => {
  const {
    className,
    children,
    style
  } = props;

  return (
    <div
      className={[
        classes.backgroundColor,
        className,
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div>
  )
}
