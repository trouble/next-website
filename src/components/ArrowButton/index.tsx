import { ArrowIcon } from '@root/icons/Arrow';
import React, { ElementType } from 'react';
import classes from './index.module.scss';

export type ButtonProps = {
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  direction?: 'left' | 'right' | 'up' | 'down'
  htmlElement?: ElementType
  size?: 'large'
  disabled?: boolean
  ariaLabel?: string
}

export const ArrowButton: React.FC<ButtonProps> = (props) => {
  const {
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
    direction = 'right',
    htmlElement = 'button',
    size,
    disabled,
    ariaLabel
  } = props;

  let rotation;
  if (direction === 'left') rotation = 180
  if (direction === 'up') rotation = -90
  if (direction === 'down') rotation = 90

  const Tag = htmlElement as ElementType;

  return (
    <Tag
      className={[
        className,
        classes.arrowButton,
        direction && classes[direction],
        size && classes[size],
        disabled && classes.disabled
      ].filter(Boolean).join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div className={classes.arrowWrapper}>
        <ArrowIcon rotation={rotation} />
      </div>
    </Tag>
  )
}
