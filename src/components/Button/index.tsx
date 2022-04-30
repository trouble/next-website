import { Hyperlink } from '@components/Hyperlink';
import { ArrowIcon } from '@root/icons/Arrow';
import { LinkFromCMS } from '@root/cms/types';
import React, { Fragment } from 'react';
import classes from './index.module.scss';

export type ButtonAppearances = 'text' | 'primaryButton' | 'secondaryButton';

export type ButtonProps = {
  className?: string,
  anchorClassName?: string
  href?: string
  label?: string
  appearance?: ButtonAppearances
  color?: string
  linkFromCMS?: LinkFromCMS
  arrow?: boolean
  size?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  type?: 'submit' | 'button'
  newTab?: boolean
  reverseIcon?: boolean
}

const ButtonContents: React.FC<ButtonProps> = (props) => {
  const {
    arrow,
    label,
    linkFromCMS,
    reverseIcon
  } = props;

  const labelToUse = label || linkFromCMS?.label;

  return (
    <Fragment>
      {arrow && reverseIcon && (
        <div
          className={[
            classes.arrowWrapper,
            classes.iconBefore
          ].filter(Boolean).join(' ')}
        >
          <ArrowIcon />
        </div>
      )}
      {labelToUse}
      {arrow && !reverseIcon && (
        <div
          className={[
            classes.arrowWrapper,
            classes.iconAfter
          ].filter(Boolean).join(' ')}
        >
          <ArrowIcon />
        </div>
      )}
    </Fragment>
  )
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    href,
    className,
    anchorClassName,
    appearance,
    color,
    linkFromCMS,
    size,
    onMouseEnter,
    onMouseLeave,
    onClick,
    type,
    newTab,
  } = props;

  const classList = [
    className,
    classes.button,
    appearance && classes[`type--${appearance}`],
    color && classes[color],
    size && classes[`size--${size}`]
  ].filter(Boolean).join(' ')

  if (type === 'submit' || type === 'button') {
    return (
      <button
        className={classList}
        type={type}
        onClick={onClick}
      >
        <span className={classes.contents}>
          <ButtonContents {...props} />
        </span>
      </button>
    )
  }

  return (
    <div className={classList}>
      <Hyperlink
        href={href}
        linkFromCMS={linkFromCMS}
        className={[
          classes.contents,
          anchorClassName
        ].filter(Boolean).join(' ')}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        newTab={newTab}
      >
        <ButtonContents {...props} />
      </Hyperlink>
    </div>
  )
}
