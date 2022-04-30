import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import { BlockContainer } from '@root/layout/BlockContainer';
import { Button } from '@components/Button';
import Margin from '@components/Margin';

const TypographyDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Buttons"
      />
      <NextHead>
        <meta
          key="robots"
          name="robots"
          content="noindex,follow"
        />
        <meta
          key="googlebot"
          name="googlebot"
          content="noindex,follow"
        />
      </NextHead>
      <BasicHero
        richText={[
          {
            type: 'p',
            children: [
              {
                type: 'link',
                url: '/styleguide',
                children: [{
                  text: `Styleguide`,
                }]
              },
              {
                type: 'span',
                children: [{
                  text: ' — Buttons'
                }]
              }
            ]
          },
          {
            type: 'h1',
            children: [{
              text: 'Buttons',
            }]
          }
        ]}
      />
      <BlockContainer>
        <Margin bottom="large">
          <Margin bottom="small">
            <Button
              label="Lorem ipsum"
              appearance="text"
            />
          </Margin>
          <Margin bottom="small">
            <Button
              label="Lorem ipsum"
              appearance="text"
              arrow
            />
          </Margin>
          <Margin bottom="small">
            <Button
              label="Lorem ipsum"
              appearance="secondaryButton"
            />
          </Margin>
          <Margin bottom="small">
            <Button
              label="Lorem ipsum"
              appearance="secondaryButton"
              arrow
            />
          </Margin>
          <Margin bottom="small">
            <Button
              label="Lorem ipsum"
              appearance="primaryButton"
            />
          </Margin>
          <Margin>
            <Button
              label="Lorem ipsum"
              appearance="primaryButton"
              arrow
            />
          </Margin>
        </Margin>
      </BlockContainer>
    </Fragment>
  )
}

export default TypographyDemo;
