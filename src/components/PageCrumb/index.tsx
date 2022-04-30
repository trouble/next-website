import { Hyperlink } from '@components/Hyperlink';
import { ArrowIcon } from '@root/icons/Arrow';
import { useBreadcrumbs } from '@root/providers/Breadcrumbs';
import React, { Fragment } from 'react';
import classes from './index.module.scss';

export const PageCrumb: React.FC<{
  className?: string
}> = (props) => {
  const { className } = props;

  const {
    showBreadcrumbs,
    breadcrumbs
  } = useBreadcrumbs();

  if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    const moreThanOneDeep = breadcrumbs.length > 1;

    if (showBreadcrumbs) {
      return (
        <div
          className={[
            classes.pageCrumb,
            className,
          ].filter(Boolean).join(' ')}
        >
          {moreThanOneDeep ? (
            <Hyperlink
              href={`/${breadcrumbs[breadcrumbs.length - 2].url}`}
            >
              <Fragment>
                <div className={classes.arrow}>
                  <ArrowIcon rotation={180} />
                </div>
                <span >
                  {breadcrumbs[breadcrumbs.length - 2].label}
                </span>
              </Fragment>
            </Hyperlink>
          ) : (
            <Fragment>
              <div className={classes.line} />
              <span className={classes.label}>
                {breadcrumbs[breadcrumbs.length - 1].label}
              </span>
            </Fragment>
          )}
        </div>
      )
    }
  }
  return null
}
