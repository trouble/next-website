import { generateDirectionsHref } from '@root/utilities/generateDirectionsHref';
// import { Location as LocationType } from '';
// import { Contact } from '';
import classes from './index.module.scss'

export const generateLocationMarker = (props: LocationType): string => {
  const {
    name,
    address,
    address: {
      line1,
      line2,
      city,
      state,
      zip
    } = {},
    contacts,
    meta: {
      image: metaImage
    } = {}
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
      value,
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

  return (`
    <div class=${classes.locationMarker}>
    <div class="${classes.header}">
      ${(metaImage && typeof metaImage !== 'string') ? (
      `<div class="${classes.imageOuter}">
          <div class="${classes.imageInner}">
            <img
              class="${classes.img}"
              src="${process.env.NEXT_PUBLIC_API_URL}/media/${metaImage.filename}"
            />
            </div>
        </div>`
    ) : ''}
      <div class="${classes.headerContent}">
        <h5 class="${classes.title}">
          ${name}
        </h5>
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
      </div>
    </div>
    </div>
  `);
}
