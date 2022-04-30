import { Hyperlink } from '@components/Hyperlink';
import { SocialMedia } from '@components/SocialMedia';
import React, { Fragment } from 'react';
import classes from './index.module.scss';


export type SocialMediaLink = {
  platform: 'facebook' | 'vimeo' | 'twitter' | 'linkedin' | 'instagram' | 'pinterest' | 'email'
  label: string
  url: string
}

export type SocialMediaLinksType = SocialMediaLink[];


export const SocialMediaLinks: React.FC<{
  links?: SocialMediaLinksType
  className?: string
  color?: string
  justifyContent?: 'flex-start' | 'center' | 'flex-end'
  useIcons?: boolean
}> = (props) => {
  const {
    links,
    className,
    color,
    justifyContent,
    useIcons = true
  } = props;

  if (links && Array.isArray(links) && links.length > 0) {
    return (
      <div
        className={[
          className,
          classes.socialMediaLinks,
          justifyContent && classes[`justify-${justifyContent}`],
          useIcons && classes.useIcons,
        ].filter(Boolean).join(' ')}
      >
        {links.map((socialLink, index) => {
          const {
            platform,
            url,
            label
          } = socialLink;

          const isLast = index === links.length - 1;

          if (useIcons) {
            return (
              <SocialMedia
                key={index}
                platform={platform}
                href={url}
                bgColor={color}
              />
            )
          }

          return (
            <Fragment key={index}            >
              <Hyperlink
                href={url}
                underline
              >
                {label}
              </Hyperlink>
              {!isLast && (
                <Fragment>
                  &#44;&nbsp;
                </Fragment>
              )}
            </Fragment>
          )
        })}
      </div>
    )
  }

  return null
}
