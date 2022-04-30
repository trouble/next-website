import { Hyperlink } from '@components/Hyperlink';
import Margin from '@components/Margin';
import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import { BlockContainer } from '@root/layout/BlockContainer';
import React, { Fragment } from 'react';

const Styleguide = () => {
  return (
    <Fragment>
      <Meta
        title="Styleguide"
      />
      <BasicHero
        richText={[
          {
            type: 'h1',
            children: [{
              text: 'Styleguide',
            }]
          }
        ]}
      />
      <BlockContainer>
        <Margin bottom="large">
          <p>
            In this styleguide:
          </p>
          <h5>
            Elements
          </h5>
          <div>
            <Hyperlink
              href="/styleguide/typography"
              underline
            >
              Typography
            </Hyperlink>
          </div>
          <div>
            <Hyperlink
              href="/styleguide/colors"
              underline
            >
              Colors
            </Hyperlink>
          </div>
          <div>
            <Hyperlink
              href="/styleguide/buttons"
              underline
            >
              Buttons
            </Hyperlink>
          </div>
          <h5>
            Blocks
          </h5>
          <Hyperlink
            underline
            href="/styleguide/content-block"
          >
            Content Block
          </Hyperlink>
          <br />
          <Hyperlink
            underline
            href="/styleguide/content-slider"
          >
            Content Slider
          </Hyperlink>
          <br />
          <Hyperlink
            underline
            href="/styleguide/media-block"
          >
            Media Block
          </Hyperlink>
          <br />
          <Hyperlink
            underline
            href="/styleguide/media-slider"
          >
            Media Slider
          </Hyperlink>
          <br />
          <Hyperlink
            underline
            href="/styleguide/form-block"
          >
            Form Block
          </Hyperlink>
          <br />
          <Hyperlink
            underline
            href="/styleguide/archive-block"
          >
            Archive Block
          </Hyperlink>
        </Margin>
      </BlockContainer>
    </Fragment >
  )
}

export default Styleguide;
