import { Hyperlink } from '@components/Hyperlink';
import { useGlobals } from '@root/providers/Globals';
import React, { useState } from 'react';
import { BlockContainer } from '../../BlockContainer';
import classes from './index.module.scss';
import { SubMenu } from './SubMenu';
import { Cell, Grid } from '@faceless-ui/css-grid';
import { Button } from '@components/Button';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { SubMenuType } from '../Mobile/SubMenu';
import { TextWithInlineIcon } from '@components/TextWithInlineIcon';
import { Chevron } from '@root/icons/Chevron';

export const DesktopMainMenu: React.FC = () => {
  const {
    mainMenu: {
      items,
      secondaryItems
    } = {}
  } = useGlobals();

  const [currentSubMenu, setCurrentSubMenu] = useState<SubMenuType | undefined>(() => {
    const firstItem = items?.[0];
    if (firstItem && firstItem.type === 'subMenu') {
      return firstItem.subMenu;
    }
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>()

  const { totalHeaderHeight } = useHeaderHeight();

  return (
    <div className={classes.desktopMainMenu}>
      <div className={classes.backgroundColor} />
      <BlockContainer
        className={classes.content}
        style={{
          paddingTop: totalHeaderHeight
        }}
      >
        <Grid className={classes.wrapper}          >
          <Cell cols={3}>
            <div className={classes.sidebar}>
              {items && Array.isArray(items) && items.length > 0 && (
                <div className={classes.items}>
                  {items.map((item, index) => {
                    const {
                      type,
                      label,
                    } = item;

                    const submenuIsActive = type === 'subMenu' && item?.subMenu !== undefined && item.subMenu === currentSubMenu;
                    const isHovered = hoveredIndex === index;

                    return (
                      <div
                        className={[
                          classes.item,
                          (isHovered || submenuIsActive) && classes.itemActive
                        ].filter(Boolean).join(' ')}
                        key={index}
                      >
                        {type === 'link' && (
                          <h3 className={classes.link}>
                            <Hyperlink
                              className={classes.linkAnchor}
                              linkFromCMS={item.link}
                              onMouseEnter={() => {
                                setCurrentSubMenu(undefined)
                                setHoveredIndex(index)
                              }}
                              onMouseLeave={() => {
                                setHoveredIndex(undefined)
                              }}
                            >
                              {label}
                            </Hyperlink>
                          </h3>
                        )}
                        {type === 'subMenu' && (
                          <h3
                            className={classes.link}
                            onMouseEnter={() => {
                              setCurrentSubMenu(item.subMenu)
                              setHoveredIndex(index)
                            }}
                            onMouseLeave={() => {
                              setHoveredIndex(undefined)
                            }}
                          >
                            <TextWithInlineIcon
                              text={label}
                              icon={(
                                <Chevron
                                  rotation={90}
                                  bold
                                />
                              )}
                            />
                          </h3>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
              {secondaryItems && (
                <div className={classes.secondaryItems}>
                  {Array.isArray(secondaryItems) && secondaryItems.length > 0 && (
                    secondaryItems.map((item, index) => {
                      const { link } = item;

                      return (
                        <div key={index}>
                          <Button
                            className={classes.secondaryItem}
                            appearance="text"
                            linkFromCMS={link}
                          />
                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </div>
          </Cell>
          <Cell
            cols={7}
            start={5}
          >
            <SubMenu currentSubmenu={currentSubMenu} />
          </Cell>
        </Grid>
      </BlockContainer>
    </div>
  )
}
