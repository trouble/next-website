import { RichTextType } from '@components/RichText';
import { LinkGroupType } from '@root/types';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useCookies } from 'react-cookie'

export type Alert = {
  id: string
  placement?: 'global' | 'pages'
  pages?: {
    relationTo: 'housing' | 'pages' | 'people' | 'posts',
    value: any // TODO: type this
  }[]
  backgroundColor?: 'matchTheme' | 'green' | 'blue' | 'red' | 'purple'
  content?: RichTextType
  links?: LinkGroupType
}

export type Alerts = Alert[]

export interface IAlerts {
  alerts: Alerts
  globalAlerts?: Alerts
  dismissAlert: (id?: string) => void // eslint-disable-line no-unused-vars
  pageAlerts?: Alerts
}

export const AlertsContext = createContext<IAlerts>({} as IAlerts);
export const useAlerts = (): IAlerts => useContext(AlertsContext);

export const AlertsProvider: React.FC<{
  alerts: Alerts
}> = (props) => {
  const {
    children,
    alerts
  } = props;

  const [cookies, setCookie] = useCookies();

  const getGlobalAlerts = useCallback((): Alerts => {
    const newGlobalAlerts = alerts?.filter((alert) => {
      const {
        placement,
        id
      } = alert;

      // check for global type
      const isGlobal = placement === 'global';
      // check for cookie dismissal
      const cookie = cookies[`alert-${id}`];
      const isDismissed = cookie === 'dismissed';

      return isGlobal && !isDismissed;
    });

    return newGlobalAlerts;
  }, [
    alerts,
    cookies
  ]);

  // same as above
  const getPageAlerts = useCallback((): Alerts => {
    const newPageAlerts = alerts?.filter((alert) => {
      const {
        placement,
        id
      } = alert;

      // check for pages type
      const isPage = placement === 'pages';
      // check for cookie dismissal
      const cookie = cookies[`alert-${id}`];
      const isDismissed = cookie === 'dismissed';

      return isPage && !isDismissed;
    });

    return newPageAlerts;
  }, [
    alerts,
    cookies
  ]);

  const [globalAlerts, setGlobalAlerts] = useState(getGlobalAlerts)
  const [pageAlerts, setPageAlerts] = useState(getPageAlerts)

  const dismissAlert = useCallback((alertID) => {
    setCookie(`alert-${alertID}`, 'dismissed');
  }, [setCookie]);

  useEffect(() => {
    setGlobalAlerts(getGlobalAlerts);
    setPageAlerts(getPageAlerts);
  }, [
    cookies,
    getGlobalAlerts,
    getPageAlerts
  ])

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        globalAlerts,
        dismissAlert,
        pageAlerts
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
