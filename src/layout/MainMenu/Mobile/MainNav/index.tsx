import { Button } from '@components/Button';
import { Hyperlink } from '@components/Hyperlink';
import { ArrowIcon } from '@root/icons/Arrow';
import { useGlobals } from '@root/providers/Globals';
import classes from './index.module.scss';
import mainClasses from '../index.module.scss';
import { MainMenuSubmenu } from '../..';

export const MainNav: React.FC<{
  setShowSubmenu: (show: boolean) => void // eslint-disable-line no-unused-vars
  setCurrentSubMenu: (submenu: MainMenuSubmenu & { title?: string }) => void // eslint-disable-line no-unused-vars
}> = (props) => {
  const {
    setShowSubmenu,
    setCurrentSubMenu
  } = props;

  const {
    mainMenu: {
      items,
      secondaryItems
    } = {}
  } = useGlobals();

  const hasItems = items && Array.isArray(items) && items.length > 0;

  return (
    <div className={classes.mainNav}>
      {hasItems && (
        <div className={classes.items}>
          {items?.map((item, index) => {
            const {
              type,
              label,
            } = item;

            return (
              <div
                className={[
                  classes.item,
                  mainClasses.animate,
                  mainClasses[`animate-${index + 1}`]
                ].filter(Boolean).join(' ')}
                key={index}
              >
                {type === 'link' && (
                  <h2 className={classes.link}>
                    <Hyperlink
                      {...{
                        ...item?.link || {},
                        className: classes.linkAnchor,
                        label: (
                          <b>
                            {label}
                          </b>
                        )
                      }}
                    />
                  </h2>
                )}
                {type === 'subMenu' && (
                  <h2
                    className={classes.link}
                    onClick={() => {
                      setShowSubmenu(true);
                      setCurrentSubMenu({
                        ...item?.subMenu || {},
                        title: label
                      })
                    }}
                  >
                    <b className={classes.linkLabel}>
                      {label}
                    </b>
                    <ArrowIcon size="large" />
                  </h2>
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
                <div
                  key={index}
                  className={[
                    classes.secondaryItem,
                    mainClasses.animate,
                    mainClasses[`animate-${(items?.length ? items.length + 1 : 0) + index}`]
                  ].filter(Boolean).join(' ')}
                >
                  <Button
                    appearance="text"
                    linkFromCMS={link}
                    color="white"
                  />
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
