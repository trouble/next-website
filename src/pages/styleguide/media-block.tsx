import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import Blocks from '@root/layout/Blocks';
import { dummyVimeoID, dummyYoutubeID } from '../../../public/styleguideData';

const MediaBlockDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Media Block"
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
                  text: ' — Layout Building Block'
                }]
              }
            ]
          },
          {
            type: 'h1',
            children: [{
              text: 'Media Block',
            }]
          }
        ]}
      />
      <Blocks
        blocks={[
          {
            blockType: 'media',
            blockName: '',
            size: 'normal',
            media: undefined, // TODO: get a static image here
            caption: [
              {
                type: 'p',
                children: [{
                  text: 'Lorem ipsum'
                }]
              }
            ]
          },
          {
            blockType: 'media',
            blockName: '',
            size: 'wide',
            media: undefined, // TODO: get a static image here
            caption: [
              {
                type: 'p',
                children: [{
                  text: 'Lorem ipsum'
                }]
              }
            ]
          },
          {
            blockType: 'media',
            blockName: '',
            size: 'fullscreen',
            media: undefined, // TODO: get a static image here
            caption: [
              {
                type: 'p',
                children: [{
                  text: 'Lorem ipsum'
                }]
              }
            ]
          },
          {
            blockType: 'media',
            blockName: '',
            embedVideo: true,
            videoID: dummyVimeoID,
            platform: 'vimeo',
            media: undefined, // TODO: get a poster image here
            caption: [
              {
                type: 'p',
                children: [{
                  text: 'Lorem ipsum'
                }]
              }
            ]
          },
          {
            blockType: 'media',
            blockName: '',
            embedVideo: true,
            videoID: dummyYoutubeID,
            platform: 'youtube',
            media: undefined, // TODO: get a poster image here
            caption: [
              {
                type: 'p',
                children: [{
                  text: 'Lorem ipsum'
                }]
              }
            ]
          }
        ]}
      />
    </Fragment>
  )
}

export default MediaBlockDemo;
