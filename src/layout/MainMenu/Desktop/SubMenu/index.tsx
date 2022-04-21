import React from 'react';
import classes from './index.module.scss';
import { Column } from './Column';

const Columns: React.FC<{
  subMenu?: any // TODO: type this
}> = (props) => {
  const {
    subMenu,
  } = props;

  if (subMenu) {
    const {
      column1,
      enableColumn2,
      column2,
    } = subMenu;

    return (
      <div className={classes.columns}>
        <Column items={column1} />
        {enableColumn2 && column2 && (
          <Column items={column2} />
        )}
      </div>
    )
  }
  return null;
}

export const SubMenu: React.FC<{
  currentSubmenu?: any // TODO: type this
  className?: string
}> = (props) => {
  const {
    currentSubmenu,
    className
  } = props;

  return (
    <div
      className={[
        className,
        classes.subMenu,
        Boolean(currentSubmenu) && classes.isOpen,
      ].filter(Boolean).join(' ')}
    >
      <Columns subMenu={currentSubmenu} />
    </div>
  )
}

