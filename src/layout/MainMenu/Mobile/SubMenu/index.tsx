import React from 'react';
import classes from './index.module.scss';
import { Column } from './Column';
import { ArrowIcon } from '@root/icons/Arrow';
import { BackgroundColor } from '@components/BackgroundColor';

export type SubMenuType = {
  title?: string
  column1: any
  enableColumn2?: boolean
  column2?: any
}
export const SubMenu: React.FC<{
  currentSubmenu?: SubMenuType
  className?: string
  setShowSubmenu: (show: boolean) => void // eslint-disable-line no-unused-vars
}> = (props) => {
  const {
    currentSubmenu,
    className,
    setShowSubmenu
  } = props;

  const {
    title,
    column1,
    enableColumn2,
    column2,
  } = currentSubmenu || {};

  return (
    <div
      className={[
        className,
        classes.subMenu,
        Boolean(currentSubmenu) && classes.isOpen,
      ].filter(Boolean).join(' ')}
    >
      <div
        onClick={() => {
          setShowSubmenu(false);
        }}
        className={classes.backButton}
      >
        <BackgroundColor color="black" />
        <div className={classes.backContent}>
          <ArrowIcon rotation={180} />
          <h4 className={classes.backLabel}>
            <b>
              {title}
            </b>
          </h4>
        </div>
      </div>
      <div className={classes.columns}>
        {column1 && (
          <Column
            columnIndex={1}
            currentSubmenu={currentSubmenu}
            items={column1}
          />
        )}
        {enableColumn2 && column2 && (
          <Column
            columnIndex={2}
            currentSubmenu={currentSubmenu}
            items={column2}
          />
        )}
      </div>
    </div>
  )
}

