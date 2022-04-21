import Meta from '@components/Meta';
import { ContentBlock } from '@root/blocks/Content';
import { dummyBody } from '@root/dummyData';
import React, { Fragment } from 'react';

export const ContentBlockDemo = () => {
  return (
    <Fragment>
      <Meta
        title="Content Block"
      />
      <ContentBlock
        columns={[
          {
            width: 'oneThird',
            richText: [
              dummyBody
            ]
          },
          {
            width: 'oneThird',
            richText: [
              dummyBody
            ]
          },
          {
            width: 'oneThird',
            richText: [
              dummyBody
            ]
          }
        ]}
      />
    </Fragment>
  )
}
