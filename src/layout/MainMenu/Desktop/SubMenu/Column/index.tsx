import { SubmenuColumn } from '@root/layout/MainMenu';
import { menuBlocks } from '@root/menuBlocks';
import React from 'react';
import classes from './index.module.scss';

export const Column: React.FC<{
  items: SubmenuColumn
}> = (props) => {
  const { items } = props;
  const hasItems = items && Array.isArray(items) && items.length > 0

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
                className={classes.item}
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
