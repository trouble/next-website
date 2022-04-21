import { Cell, Grid } from '@faceless-ui/css-grid';
import React, { forwardRef, Ref } from 'react';
import classes from './index.module.scss'

type Props = {
  id?: string
  className?: string
  cellClassName?: string
  style?: React.CSSProperties
  ref?: Ref<HTMLElement>
  tabIndex?: number
  children: React.ReactNode
}

// places two columns onto each side of its children,
// reduces available columns in all child grids to 12 (easily divisible)
export const BlockContainer: React.FC<Props> = forwardRef<HTMLElement, Props>((props, ref) => {
  const {
    id,
    children,
    className,
    cellClassName,
    style,
    tabIndex
  } = props;

  return (
    <Grid
      ref={ref}
      id={id}
      className={[
        className,
        classes.blockContainer
      ].filter(Boolean).join(' ')}
      style={style}
      htmlAttributes={{ tabIndex }}
    >
      <Cell
        className={cellClassName}
        start={3}
        startL={2}
        cols={12}
        colsL={12}
        colsM={8}
        startM={1}
      >
        {children}
      </Cell>
    </Grid>
  );
});

BlockContainer.displayName = 'BlockContainer';
