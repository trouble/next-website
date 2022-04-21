import Margin from '@components/Margin';
import Padding from '@components/Padding';
import { BlockContainer } from '@root/layout/BlockContainer';
import React from 'react';

const Error404: React.FC = () => {
  return (
    <BlockContainer>
      <Margin top="medium">
        <Padding
          top="small"
          bottom="large"
        >
          <div>
            Error: 404
          </div>
          <br />
          <h1 style={{ margin: 0 }}>
            This page was not found.
          </h1>
        </Padding>
      </Margin>
    </BlockContainer>
  )
}

export default Error404;
