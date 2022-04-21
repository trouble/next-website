import React from 'react';
import { Facebook } from './Facebook';
import { LinkedIn } from './LinkedIn';
import { Twitter } from './Twitter';
import classes from './index.module.scss';
import { Vimeo } from './Vimeo';
import { Instagram } from './Instagram';
import { Pinterest } from './Pinterest';
import { Email } from './Email';

const platforms = {
  'twitter': Twitter,
  'facebook': Facebook,
  'linkedin': LinkedIn,
  'vimeo': Vimeo,
  'instagram': Instagram,
  'pinterest': Pinterest,
  'email': Email,
}

export const SocialMedia: React.FC<{
  href: string
  platform?: 'twitter' | 'facebook' | 'linkedin' | 'vimeo' | 'instagram' | 'pinterest' | 'email'
  bgColor?: string
}> = (props) => {
  const {
    href,
    platform,
    bgColor = 'white'
  } = props;

  const Icon = platform ? platforms[platform] : null;

  if (Icon) {
    return (
      <a
        href={href}
        className={[
          classes.socialMedia,
          bgColor && classes[`bg-color-${bgColor}`]
        ].join(' ')}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={`${platform} link`}
      >
        <Icon
          className={classes.icon}
          color={bgColor === 'white' ? 'gray' : 'white'}
        />
      </a>
    )
  }

  return null;
}
