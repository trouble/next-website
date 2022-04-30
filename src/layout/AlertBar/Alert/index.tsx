import { BackgroundColor } from '@components/BackgroundColor';
import { ButtonGroup } from '@components/ButtonGroup';
import { RichText, RichTextType } from '@components/RichText';
import { CloseIcon } from '@root/icons/CloseIcon';
import { BlockContainer } from '@root/layout/BlockContainer';
import { useAlerts } from '@root/providers/Alerts';
import { LinkGroupFromCMS } from '@root/cms/types';
import React from 'react';
import classes from './index.module.scss';

export type AlertType = {
  id: string
  content?: RichTextType
  links?: LinkGroupFromCMS
  backgroundColor?: string
}

export const Alert: React.FC<AlertType> = (props) => {
  const {
    id,
    content,
    links,
    backgroundColor: bg
  } = props;

  const hasLinks = links && Array.isArray(links) && links.length > 0;

  const { dismissAlert } = useAlerts();

  return (
    <div className={classes.alertWrapper}>
      <div className={classes.alertContent}>
        <BackgroundColor color={bg} />
        <BlockContainer>
          <div className={classes.wrapper}>
            <div className={classes.content}>
              <RichText
                className={classes.richText}
                content={content}
                overrides={{
                  text: {
                    small: true
                  }
                }}
              />
              {hasLinks && (
                <ButtonGroup
                  marginSize="small"
                  buttons={links?.map(({ link }) => {
                    return ({
                      linkFromCMS: link,
                      size: 'small',
                    })
                  })}
                />
              )}</div>
            <button
              className={classes.dismiss}
              onClick={() => {
                dismissAlert(id);
              }}
            >
              <CloseIcon />
            </button>
          </div>
        </BlockContainer>
      </div>
      <div className={classes.separator} />
    </div>
  )
}
