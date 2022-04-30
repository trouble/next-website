import Meta from '@components/Meta';
import { BasicHero } from '@root/heros/Basic';
import React, { Fragment } from 'react';
import NextHead from 'next/head';
import Blocks from '@root/layout/Blocks';

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
                  text: ' — Typography'
                }]
              }
            ]
          },
          {
            type: 'h1',
            children: [{
              text: 'Typography',
            }]
          }
        ]}
      />
      <Blocks
        blocks={[
          {
            blockType: 'content',
            blockName: '',
            columns: [
              {
                width: 'full',
                richText: [
                  {
                    type: 'h1',
                    children: [
                      {
                        text: 'H1: Lorem ipsum dolor sit amet, elit '
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
                  {
                    type: 'h2',
                    children: [
                      {
                        text: 'H2: Duis sit amet iaculis magna '
                      },
                      {
                        text: 'at consequat est',
                      },
                      {
                        text: ' uis sit amet iaculis magna.'
                      },
                    ]
                  },
                  {
                    type: 'h3',
                    children: [
                      {
                        text: 'H3: Fusce eu euismod massa class aptent ad litora '
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
                  {
                    type: 'h4',
                    children: [
                      {
                        text: 'H4: Pellentesque fermentum velit dui, torquent per '
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
                  {
                    type: 'h5',
                    children: [
                      {
                        text: 'H5: Vivamus feugiat lacinia congue. Nunc lobortis massa eu lacus auctor, id imperdiet ligula tincidunt '
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
                  {
                    type: 'h6',
                    children: [
                      {
                        text: 'H6: Fusce ullamcorper porttitor sodales. Mauris fermentum, est a hendrerit accumsan, ligula nisl lacinia ligula, '
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
                  {
                    type: 'p',
                    children: [
                      {
                        text: 'Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, cursus non imperdiet sit amet, efficitur ac sapien. In hac habitasse platea dictumst. Vestibulum vitae dui mauris. In hac habitasse platea dictumst. Etiam laoreet, massa id aliquet tincidunt, purus nisi interdum risus, ut porttitor eros arcu in odio. Integer volutpat ornare turpis, sagittis consectetur nisl efficitur quis. Nam eget mollis neque. Aliquam erat volutpat. Integer at laoreet elit, non lobortis nisl.'
                      },
                    ]
                  },
                  {
                    type: 'span',
                    children: [
                      {
                        text: 'Small: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque erat elit, cursus non imperdiet sit amet, efficitur ac sapien. In hac habitasse platea dictumst. Vestibulum vitae dui mauris. In hac habitasse platea dictumst. Etiam laoreet, massa id aliquet tincidunt, purus nisi interdum risus, ut porttitor eros arcu in odio. Integer volutpat ornare turpis, sagittis consectetur nisl efficitur quis. Nam eget mollis neque. Aliquam erat volutpat. Integer at laoreet elit, non lobortis nisl.',
                        small: true,
                      },
                    ]
                  },
                ]
              }
            ]
          }
        ]}
      />
    </Fragment>
  )
}

export default TypographyDemo;
