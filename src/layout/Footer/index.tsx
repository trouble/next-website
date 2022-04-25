import React from 'react';
import classes from './index.module.scss';
import Link from 'next/link';
import { BlockContainer } from '../BlockContainer';
import { useGlobals } from '@root/providers/Globals';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { FooterMenuLinkType, MenuLink } from './MenuLink';
import { Hyperlink } from '@components/Hyperlink';
import { LanguageIcon } from '@root/icons/Language';
import { ModalToggler } from '@faceless-ui/modal'
import { SocialMediaLinks } from '@components/SocialMediaLinks';
import { Logo } from '@components/Logo';

export type FooterType = {
  column1?: FooterMenuLinkType[]
  column2?: FooterMenuLinkType[]
}

export const Footer: React.FC = () => {
  const {
    footer,
    meta
  } = useGlobals();

  const {
    column1,
    column2
  } = footer || {};

  const {
    legalLinks,
    socialMediaLinks,
    phone,
    nationalPhone,
    fax
  } = meta || {};

  const hasColumn1 = column1 && Array.isArray(column1) && column1.length > 0;
  const hasColumn2 = column2 && Array.isArray(column2) && column2.length > 0;
  const hasLegalLinks = legalLinks && Array.isArray(legalLinks) && legalLinks.length > 0;

  return (
    <div className={classes.footer}>
      <BlockContainer className={classes.blockContainer}>
        <div className={classes.content}>
          {(hasColumn1 || hasColumn2) && (
            <Grid>
              <Cell
                cols={4}
                colsM={4}
                colsS={4}
                className={classes.column}
              >
                <Link
                  href="/"
                  scroll={false}
                >
                  <a
                    className={classes.mobileLogo}
                    aria-label="Home link"
                  >
                    <Logo />
                  </a>
                </Link>
                {hasColumn1 && column1?.map((item, index) => {
                  return (
                    <MenuLink
                      key={index}
                      {...item}
                    />
                  )
                })}
                <SocialMediaLinks
                  className={classes.socialLinksMobile}
                  links={socialMediaLinks}
                />
              </Cell>
              {hasColumn2 && (
                <Cell
                  cols={4}
                  colsM={4}
                  colsS={4}
                  className={classes.column}
                >
                  {column2?.map((item, index) => {
                    return (
                      <MenuLink
                        key={index}
                        {...item}
                      />
                    )
                  })}
                </Cell>
              )}
              <Cell
                cols={4}
                colsM={8}
              >
                <Link
                  href="/"
                  scroll={false}
                >
                  <a
                    className={classes.logo}
                    aria-label="Home link"
                  >
                    <Logo />
                  </a>
                </Link>
                <div className={classes.contact}>
                  {phone && (
                    <Hyperlink
                      href={`tel:+${phone}`}
                      className={classes.contactLink}
                      dimOnHover
                    >
                      {`Phone: ${phone}`}
                    </Hyperlink>
                  )}
                  {nationalPhone && (
                    <Hyperlink
                      href={`tel:+${nationalPhone}`}
                      className={classes.contactLink}
                      dimOnHover
                    >
                      {`National: ${nationalPhone}`}
                    </Hyperlink>
                  )}
                  {fax && (
                    <Hyperlink
                      href={`fax:+${fax}`}
                      className={classes.contactLink}
                      dimOnHover
                    >
                      {`Fax: ${fax}`}
                    </Hyperlink>
                  )}
                  <ModalToggler
                    slug="language-assistance"
                    className={classes.languageToggler}
                  >
                    <LanguageIcon />
                    <div className={classes.languageLabel}>
                      Language Assistance
                    </div>
                  </ModalToggler>
                </div>
              </Cell>
            </Grid>
          )}
          <Grid>
            <Cell>
              <div className={classes.legal}>
                <span>
                  {`©${new Date().getFullYear()} My Website. All rights reserved.`}
                </span>
                {hasLegalLinks && legalLinks?.map((legalLink, index) => {
                  const {
                    link,
                    link: {
                      label
                    }
                  } = legalLink;

                  return (
                    <Hyperlink
                      className={classes.legalLink}
                      key={index}
                      linkFromCMS={link}
                      dimOnHover
                    >
                      {label}
                    </Hyperlink>
                  )
                })}
              </div>
              <SocialMediaLinks
                className={classes.socialLinksDesktop}
                links={socialMediaLinks}
                justifyContent="center"
              />
            </Cell>
          </Grid>
        </div>
      </BlockContainer>
    </div>
  )
}
