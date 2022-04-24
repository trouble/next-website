import { BackgroundColor } from '@components/BackgroundColor';
import { Button } from '@components/Button';
import { Hyperlink } from '@components/Hyperlink';
import Margin from '@components/Margin';
import Meta from '@components/Meta';
import Padding from '@components/Padding';
import { RichText } from '@components/RichText';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { BasicHero } from '@root/heros/Basic';
import { BlockContainer } from '@root/layout/BlockContainer';
import Link from 'next/link';
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
        <h4>
          Colors
        </h4>
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
      </BlockContainer>
      <BlockContainer>
        <Margin bottom="small">
          <Link href={`#h1`}>
            <a
              style={{ color: 'currentColor' }}
              id="h1"
            >
              H1
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h1',
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet, elit '
                  },
                  {
                    text: 'consectetur adipiscing',
                    underline: true
                  },
                  {
                    text: ' lorem ipsum dolor sit amet, elit.'
                  },
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#h2`}>
            <a
              style={{ color: 'currentColor' }}
              id="h2"
            >
              H2
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h2',
                children: [
                  {
                    text: 'Duis sit amet iaculis magna '
                  },
                  {
                    text: 'at consequat est',
                  },
                  {
                    text: ' uis sit amet iaculis magna.'
                  },
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#h3`}>
            <a
              style={{ color: 'currentColor' }}
              id="h3"
            >
              H3
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h3',
                children: [
                  {
                    text: 'Fusce eu euismod massa class aptent ad litora '
                  },
                  {
                    text: 'taciti sociosqu',
                    underline: true
                  },
                  {
                    text: ' massa class.'
                  },
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#h4`}>
            <a
              style={{ color: 'currentColor' }}
              id="h4"
            >
              H4
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h4',
                children: [
                  {
                    text: 'Pellentesque fermentum velit dui, torquent per '
                  },
                  {
                    text: 'conubia nostra',
                    underline: true
                  },
                  {
                    text: ' inceptos himenaeos.'
                  },
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#h5`}>
            <a
              style={{ color: 'currentColor' }}
              id="h5"
            >
              H5
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h5',
                children: [
                  {
                    text: 'Vivamus feugiat lacinia congue. Nunc lobortis massa eu lacus auctor, id imperdiet ligula tincidunt '
                  },
                  {
                    text: 'imperdiet ligula tincidunt',
                    underline: true
                  },
                  {
                    text: ' aliquam nec vulputate lorem.'
                  }
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#h6`}>
            <a
              style={{ color: 'currentColor' }}
              id="h6"
            >
              H6
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'h6',
                children: [
                  {
                    text: 'Fusce ullamcorper porttitor sodales. Mauris fermentum, est a hendrerit accumsan, ligula nisl lacinia ligula, '
                  },
                  {
                    text: 'ligula nisl lacinia ligula',
                    underline: true
                  },
                  {
                    text: ' a tristique sapien leo at erat.'
                  }
                ]
              },
            ]}
          />
        </Margin>
        <Margin bottom="small">
          <Link href={`#p`}>
            <a
              style={{ color: 'currentColor' }}
              id="p"
            >
              Paragraph
            </a>
          </Link>
        </Margin>
        <Margin bottom="small">
          <RichText
            content={[
              {
                type: 'p',
                children: [
                  {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, cursus non imperdiet sit amet, efficitur ac sapien. In hac habitasse platea dictumst. Vestibulum vitae dui mauris. In hac habitasse platea dictumst. Etiam laoreet, massa id aliquet tincidunt, purus nisi interdum risus, ut porttitor eros arcu in odio. Integer volutpat ornare turpis, sagittis consectetur nisl efficitur quis. Nam eget mollis neque. Aliquam erat volutpat. Integer at laoreet elit, non lobortis nisl.'
                  },
                ]
              },
            ]}
          />
        </Margin>
      </BlockContainer>
      <BlockContainer>
        <Padding
          top="large"
          bottom="large"
        >
          <h4>
            Buttons
          </h4>
          <div>
            <p>
              Text:
            </p>
            <Button
              label="Lorem ipsum"
            />
          </div>
          <div>
            <p>
              Primary:
            </p>
            <Button
              label="Lorem ipsum"
              appearance="primaryButton"
            />
          </div>
          <div>
            <p>
              Secondary:
            </p>
            <Button
              label="Lorem ipsum"
              appearance="secondaryButton"
            />
          </div>
          <h4>
            Blocks
          </h4>
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
        </Padding>
      </BlockContainer>
    </Fragment>
  )
}

export default Styleguide;
