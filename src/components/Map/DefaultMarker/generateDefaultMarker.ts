import { AddressType } from '@components/Address';
import { PayloadMediaType } from '@root/cms/types';
import { generateDirectionsHref } from '@root/utilities/generateDirectionsHref';

import classes from './index.module.scss'

export type DefaultMarkerProps = {
  title?: string
  slug?: string
  address?: AddressType
  meta?: {
    image: PayloadMediaType
  }
  contacts?: any
  categories?: any
}

export const generateDefaultMarker = (props: DefaultMarkerProps, asPath: string): string => {
  const {
    title,
    slug,
    address,
    address: {
      line1,
      line2,
      city,
      state,
      zip,
    } = {},
    meta: {
      image
    } = {},
    categories
  } = props;

  const directions = generateDirectionsHref(address);

  const addressString = `
    <div>
      ${line1 ? `<div>${line1}</div>` : ''}
      ${line2 ? `<div>${line2}</div>` : ''}
      <div>
        ${city ? `<span>${city},</span>` : ''}
        ${state ? `<span>${state}</span>` : ''}
        ${zip ? `<span>${zip}</span>` : ''}
      </div>
    </div>
  `;

  const titleToUse = title || name;
  const href = slug ? `/housing/${slug}` : '';
  const [category] = categories || []; // TODO: loop all categories and render each one, for now just use the first one

  const isOnPage = asPath === href;

  return (`
    <div class=${classes.housingMarker}>
    <div class="${classes.header}">
      <div class="${classes.imageOuter}">
          <div class="${classes.imageInner}">
            <a
              href="${href}"
              class="${classes.imageAnchor}"
            >
            ${(image && typeof image !== 'string') && (
      `<img
              class="${classes.img}"
              src="${process.env.NEXT_PUBLIC_API_URL}/media/${image.filename}"
              />
              <div class="${classes.imageOverlay}"></div>`
    )}
    <div class="${classes.headerContent}">
    ${category ? (
      `<div class="${classes.category}">
            ${category.title}
          </div>`
    ) : undefined}
    <h5 class="${classes.title}">
            ${titleToUse}
          </h5>
          </div>
            </a>
            </div>
        </div>
    </div>
    <div class="${classes.flexContent}">
        ${directions ? (
      `<div class="${classes.address}">
          <a
            href="${directions}"
            class="${classes.directionsAnchor}"
            rel="noopener noreferrer"
            target="_blank"
          >
              ${addressString}
          </a>
        </div>`
    ) : (
      `<div class="${classes.address}">
          ${addressString}
        </div>`
    )}
    ${!isOnPage ? (
      `<a
            href="${href}"
            class="${classes.anchor} ${classes.listingLink}"
          >
            Full listing
          </a>`
    ) : ''}
      </div>
    </div>
    </div>
  `);
}
