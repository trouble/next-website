import { menuBlocks } from '@root/menuBlocks';
import React from 'react';
import classes from './index.module.scss';
import mainClasses from '../../index.module.scss';
import { MainMenuSubmenu, SubmenuColumn } from '@root/layout/MainMenu';

export const Column: React.FC<{
  items: SubmenuColumn
  columnIndex: number
  currentSubmenu?: MainMenuSubmenu
}> = (props) => {
  const {
    items,
    columnIndex,
    currentSubmenu
  } = props;

  const hasItems = items && Array.isArray(items) && items.length > 0;

  let animationOffset = 0;

  if (columnIndex === 2 && currentSubmenu) {
    animationOffset = currentSubmenu.column1.length;
  }

  if (hasItems) {
    return (
      <div className={classes.column}>
        {items.map((item, index) => {
          const {
            blockType
          } = item;

          const MenuBlock = blockType ? menuBlocks?.[blockType] : null;

          if (MenuBlock) {
            return (
              <div
                className={[
                  classes.item,
                  mainClasses.animate,
                  mainClasses[`animate-${animationOffset + index}`]
                ].filter(Boolean).join(' ')}
                key={index}
              >
                {/* @ts-ignore */}
                <MenuBlock
                  {...item}
                />
              </div>
            )
          }
          return null;
        })}
      </div>
    )
  }
  return null;
}
