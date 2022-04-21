import React, { ElementType, Fragment } from 'react';
import classes from './index.module.scss';

export const TextWithInlineIcon: React.FC<{
  id?: string
  className?: string
  text: string
  icon: any
  element?: ElementType
  animateIconOnHover?: boolean,
  dimOnHover?: boolean
}> = (props) => {
  const {
    className,
    text,
    icon: Icon,
    element: Element = 'span',
    animateIconOnHover,
    dimOnHover
  } = props;

  if (text) {
    const words = text.trim().split(' ');

    return (
      <Element
        className={[
          className,
          classes.textWithInlineIcon,
          animateIconOnHover && classes.animateIconOnHover,
          dimOnHover && classes.dimOnHover
        ].filter(Boolean).join(' ')}
      >
        {words && words.length > 0 && words.map((word, index) => {
          const isLast = index === words.length - 1;

          return (
            <span
              key={index}
              className={classes.span}
            >
              {!isLast ? (
                <Fragment>
                  {word}
                  &nbsp;
                </Fragment>
              ) : (
                <span className={classes.iconWrapper}>
                  {word}
                  &nbsp;
                  <span className={classes.icon}>
                    {Icon}
                  </span>
                </span>
              )}
            </span>
          );
        })}
      </Element>
    );
  }
  return null;
};
