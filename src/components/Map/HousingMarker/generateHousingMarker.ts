import { generateDirectionsHref } from '@root/utilities/generateDirectionsHref';
// import { Housing as HousingType } from '';
// import { Contact } from '';
import classes from './index.module.scss'

export const generateHousingMarker = (props: Omit<HousingType, 'layout'>, asPath: string): string => {
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
    contacts,
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

  const contactString = (contact: Contact) => {
    const {
      type,
      label,
      value
    } = contact;

    return (
      `<div>
        ${label}:
        ${' '}
        <a
          href="${type}:+${value}"
          class="${classes.anchor} ${classes.contactAnchor}"
        >
          <div class="${classes.contactLabel}">
            ${value}
          </div>
        </a>
      </div>`
    )
  }

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
      ${contacts ? (
      `<div class="${classes.contacts}">
        ${contacts.map((contact) => contactString(contact)).join('')}
      </div>`
    ) : ''}
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
