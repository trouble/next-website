import React from 'react';
import classes from './index.module.scss';

const Padding: React.FC<{
  top?: 'none' | 'small' | 'medium' | 'large'
  bottom?: 'none' | 'small' | 'medium' | 'large'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}> = (props) => {
  const {
    children,
    top,
    bottom,
    className,
    style
  } = props;

  return (
    <div
      className={[
        className,
        classes[`top-${top}`],
        classes[`bottom-${bottom}`],
      ].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </div >
  )
}

export default Padding;
