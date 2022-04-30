import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import Margin from '@components/Margin';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { BackgroundColor } from '@components/BackgroundColor';
import { BlockContainer } from '@root/layout/BlockContainer';

const TypographyDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Typography"
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
                  text: ' — Colors'
                }]
              }
            ]
          },
          {
            type: 'h1',
            children: [{
              text: 'Colors',
            }]
          }
        ]}
      />
      <BlockContainer>
        <Margin bottom="large">
          <Grid>
            <Cell cols={2}>
              <div
                style={{
                  width: '100%',
                  height: '0',
                  paddingTop: '100%',
                  position: 'relative'
                }}
              >
                <BackgroundColor color="light-gray" />
              </div>
            </Cell>
            <Cell cols={2}>
              <div
                style={{
                  width: '100%',
                  height: '0',
                  paddingTop: '100%',
                  position: 'relative'
                }}
              >
                <BackgroundColor color="dark-gray" />
              </div>
            </Cell>
          </Grid>
        </Margin>
      </BlockContainer>
    </Fragment>
  )
}

export default TypographyDemo;
