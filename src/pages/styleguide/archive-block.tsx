import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import Blocks from '@root/layout/Blocks';

const ArchiveBlockDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Archive Block"
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
              text: 'Archive Block',
            }]
          }
        ]}
      />
      <Blocks
        blocks={[
          {
            blockType: 'archive',
            blockName: '',
            collection: 'posts'
          }
        ]}
      />
    </Fragment>
  )
}

export default ArchiveBlockDemo;
