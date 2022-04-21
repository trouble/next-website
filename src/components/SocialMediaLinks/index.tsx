import { SocialMedia } from '@components/SocialMedia';
import React from 'react';
import classes from './index.module.scss';


export type SocialMediaLink = {
  type: 'facebook' | 'vimeo' | 'twitter' | 'linkedin' | 'instagram' | 'pinterest' | 'email'
  url: string
}

export type SocialMediaLinksType = SocialMediaLink[];


export const SocialMediaLinks: React.FC<{
  label?: string
  links?: SocialMediaLinksType
  className?: string
  color?: string
  justifyContent?: 'flex-start' | 'center' | 'flex-end'
}> = (props) => {
  const {
    label,
    links,
    className,
    color,
    justifyContent
  } = props;

  if (links && Array.isArray(links) && links.length > 0) {
    return (
      <div
        className={[
          className,
          classes.socialMediaLinks,
          justifyContent && classes[`justify-${justifyContent}`]
        ].filter(Boolean).join(' ')}
      >
        {label && (
          <div className={classes.label}>
            {label}
          </div>
        )}
        {links.map((socialLink, index) => {
          const {
            type,
            url
          } = socialLink;

          return (
            <SocialMedia
              key={index}
              platform={type}
              href={url}
              bgColor={color}
            />
          )
        })}
      </div>
    )
  }

  return null
}
