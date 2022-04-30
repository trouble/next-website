import React from 'react';
import classes from './index.module.scss';
import { Button, ButtonProps } from '@components/Button';
import { LinkGroupFromCMS } from '@root/cms/types';

export const ButtonGroup: React.FC<{
  className?: string
  buttons?: ButtonProps[]
  linksFromCMS?: LinkGroupFromCMS
  marginSize?: 'small'
}> = (props) => {
  const {
    buttons: buttonsFromProps,
    linksFromCMS,
    className,
    marginSize
  } = props;

  let buttons = buttonsFromProps;

  // optionally adapt a links array from the cms
  if (linksFromCMS) {
    buttons = linksFromCMS.map(({ link }) => ({
      appearance: link.appearance,
      linkFromCMS: link,
    }))
  }

  const hasButtons = buttons && Array.isArray(buttons) && buttons.length > 0;

  if (hasButtons) {
    return (
      <div
        className={[
          className,
          classes.buttonGroup,
          marginSize && classes[`margin--${marginSize}`]
        ].filter(Boolean).join(' ')}
      >
        {buttons?.map((button, index) => {
          return (
            <Button
              key={index}
              {...button}
            />
          )
        })}
      </div>
    )
  }

  return null;
}
