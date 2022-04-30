import React from 'react';
import classes from './index.module.scss';
import { BlockContainer } from '../BlockContainer';
import { useGlobals } from '@root/providers/Globals';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { FooterMenuLinkType, MenuLink } from './MenuLink';
import { Hyperlink } from '@components/Hyperlink';
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
  } = meta || {};

  const hasColumn1 = column1 && Array.isArray(column1) && column1.length > 0;
  const hasColumn2 = column2 && Array.isArray(column2) && column2.length > 0;
  const hasLegalLinks = legalLinks && Array.isArray(legalLinks) && legalLinks.length > 0;

  return (
    <div className={classes.footer}>
      <BlockContainer className={classes.blockContainer}>
        <div className={classes.content}>
          <div>
            <Hyperlink href="/" >
              <Logo />
            </Hyperlink>
          </div>
          {(hasColumn1 || hasColumn2) && (
            <Grid>
              <Cell
                cols={4}
                colsM={4}
                colsS={4}
                className={classes.column}
              >
                {hasColumn1 && column1?.map((item, index) => {
                  return (
                    <MenuLink
                      key={index}
                      {...item}
                    />
                  )
                })}
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
            </Grid>
          )}
          <Grid>
            <Cell>
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
                <SocialMediaLinks
                  className={classes.socialLinks}
                  links={socialMediaLinks}
                  useIcons={false}
                />
              </div>
            </Cell>
          </Grid>
          <Grid>
            <Cell>
              <div className={classes.bottomNav}>
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
              </div>
            </Cell>
          </Grid>
        </div>
      </BlockContainer>
    </div>
  )
}
