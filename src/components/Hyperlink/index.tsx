import { LinkFromCMS } from '@root/cms/types';
import { formatSlug } from '@root/utilities/formatSlug';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';
import classes from './index.module.scss';

// NOTE: this component exists so that any element can be linked with a sanitized url, and conditionally passed through local routing
// this adds consistency and safety to any links rendered through the app, in or outside a traditional button component

export type HyperlinkProps = {
  href: string
  className?: string
  linkFromCMS?: LinkFromCMS
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  underline?: boolean
  underlineOnHover?: boolean
  dimOnHover?: boolean
  htmlAttributes?: {
    [key: string]: unknown,
  }
  display?: 'block'
  style?: CSSProperties
  newTab?: boolean
  children?: React.ReactNode
}

export const Hyperlink: React.FC<HyperlinkProps> = (props) => {
  const {
    className,
    href: hrefFromProps,
    children,
    linkFromCMS, // send raw cms link data though this prop to have its href extracted
    onMouseEnter,
    onMouseLeave,
    onClick,
    underline,
    underlineOnHover,
    dimOnHover,
    htmlAttributes,
    display,
    style,
    newTab: newTabFromProps,
  } = props;

  let href = hrefFromProps;
  let openInNewTab = newTabFromProps;

  const { asPath } = useRouter();

  // links from the cms need to be extracted
  if (linkFromCMS) {
    const {
      type,
      url,
      reference,
      newTab: newTabFromLink,
    } = linkFromCMS;

    if (type === 'reference' && reference) {
      href = formatSlug(reference);
    }

    if (type === 'custom' && url) {
      href = url;
    }

    if (newTabFromLink) {
      openInNewTab = true;
    }
  }

  const isOnPage = asPath === href;

  const sharedProps = {
    ...htmlAttributes,
    className: [
      className,
      classes.hyperlink,
      underline && classes.underline,
      (underline !== true && underlineOnHover) && classes.underlineOnHover,
      (dimOnHover && href) && classes.dimOnHover, // only do when href is actually set
      display && classes[`display-${display}`],
      (!href || isOnPage) && classes.disableCursor,
    ].filter(Boolean).join(' '),
    onMouseEnter,
    onMouseLeave,
    onClick,
    style,
    target: openInNewTab ? '_blank' : '',
    rel: openInNewTab ? 'noopener noreferrer' : '',
  };

  if (href) {
    const hrefIsLocal = ['tel:', 'mailto:', '/'].some(prefix => href.startsWith(prefix));

    if (!hrefIsLocal) {
      try {
        const url = new URL(href);
        if (url.origin === process.env.NEXT_PUBLIC_APP_URL) {
          href = url.href.replace(process.env.NEXT_PUBLIC_APP_URL, '');
        }
      } catch (e) {
        console.error(`Failed to format url: ${href}`, e);
      }
    }

    if (href.indexOf('/') === 0) {
      return (
        <Link
          href={href}
          prefetch={false}
          scroll={false}
        >
          <a
            {...sharedProps}
          >
            {children}
          </a>
        </Link>
      );
    }
  }

  return (
    <a
      href={href}
      {...sharedProps}
    >
      {children}
    </a>
  );
};
