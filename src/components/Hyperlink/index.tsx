import { LinkType } from '@root/types';
import { formatPermalink } from '@root/utilities/formatPermalink';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties } from 'react';
import classes from './index.module.scss';

// NOTE: this component exists so that any element can be linked with a sanitized url, and conditionally passed through local routing
// this adds consistency and safety to any links rendered through the app, in or outside a traditional button component

export type HyperlinkProps = {
  href?: string
  className?: string
  linkFromCMS?: LinkType
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
    newTab: newTabFromProps
  } = props;

  let href = hrefFromProps;
  let openInNewTab = newTabFromProps;

  const {
    asPath,
    query: {
      category: currentCategory
    } = {}
  } = useRouter();

  // links from the cms need to be extracted
  if (linkFromCMS) {
    const {
      type,
      url,
      reference,
      newTab: newTabFromLink,
    } = linkFromCMS;

    if (type === 'reference' && reference) {
      href = formatPermalink(reference, currentCategory);
    }

    if (type === 'custom') {
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
      !href || isOnPage && classes.disableCursor
    ].filter(Boolean).join(' '),
    onMouseEnter,
    onMouseLeave,
    onClick,
    style,
    target: openInNewTab ? '_blank' : '',
    rel: openInNewTab ? 'noopener noreferrer' : '',
  }

  if (!href) {
    return (
      <span
        {...sharedProps}
      >
        {children}
      </span>
    )
  }

  const sanitizedHref = href; // todo: sanitize the href as necessary (strip top-level domains, etc)
  let isLocal = true; // todo: check isLocalPath (to conditionally render a link or raw html anchor and open in new tab)

  if (sanitizedHref.startsWith('tel:') || sanitizedHref.startsWith('mailto:')) isLocal = false;

  if (isLocal) {
    return (
      <Link
        href={sanitizedHref}
        prefetch={false}
        scroll={false}
      >
        <a
          {...sharedProps}
        >
          {children}
        </a>
      </Link>
    )
  }

  return (
    <a
      href={sanitizedHref}
      {...sharedProps}
    >
      {children}
    </a>
  )
}
