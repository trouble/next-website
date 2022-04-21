import { useAlerts } from '@root/providers/Alerts';
import { useHeaderHeight } from '@root/providers/HeaderHeight';
import { useResize } from '@root/utilities/useResize';
import React, { useEffect, useRef } from 'react';
import { Alert } from './Alert';
import classes from './index.module.scss';

export const AlertBar: React.FC<{
  pageProps: {
    id?: string
  }
}> = (props) => {
  const {
    pageProps: {
      id: currentPageID
    } = {}
  } = props;

  const {
    globalAlerts,
    pageAlerts
  } = useAlerts();

  const hasGlobalAlerts = globalAlerts && Array.isArray(globalAlerts) && globalAlerts.length > 0;
  const hasPageAlerts = pageAlerts && Array.isArray(pageAlerts) && pageAlerts.length > 0;

  const containerRef = useRef(null);

  const { size } = useResize(containerRef);

  const {
    setAlertsHeight
  } = useHeaderHeight();

  useEffect(() => {
    if (size) {
      const { height } = size;
      setAlertsHeight(height)
    }
  }, [
    size,
    setAlertsHeight
  ])

  return (
    <div
      ref={containerRef}
      className={classes.alertBar}
    >
      {hasGlobalAlerts &&
        globalAlerts?.map((alert, index) => {
          return (
            <Alert
              key={`global-alert-${index}`}
              {...alert}
            />
          )
        })
      }
      {hasPageAlerts && pageAlerts?.map((alert, index) => {
        const {
          pages
        } = alert;

        if (pages) {
          const isOnPage = pages.some(({ value: doc }) => doc?.id === currentPageID);

          if (isOnPage) {
            return (
              <Alert
                key={`global-alert-${index}`}
                {...alert}
              />
            )
          }
          return null;
        }
      })}
    </div>
  )
}
