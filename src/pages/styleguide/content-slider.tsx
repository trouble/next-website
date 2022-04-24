import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import Blocks from '@root/layout/Blocks';
import { dummyBody } from '../../../public/styleguideData';

const ContentSliderDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Content Slider"
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
                  text: ' — Block'
                }]
              }
            ]
          },
          {
            type: 'h1',
            children: [{
              text: 'Content Slider',
            }]
          }
        ]}
      />
      <Blocks
        blocks={[
          {
            blockType: 'contentSlider',
            blockName: '',
            slides: [
              {
                richText: [
                  dummyBody
                ]
              },
              {
                richText: [
                  dummyBody
                ]
              },
              {
                richText: [
                  dummyBody
                ]
              },
              {
                richText: [
                  dummyBody
                ]
              },
              {
                richText: [
                  dummyBody
                ]
              },
              {
                richText: [
                  dummyBody
                ]
              }
            ]
          }
        ]}
      />
    </Fragment>
  )
}

export default ContentSliderDemo;
