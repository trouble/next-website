import { RichTextType } from '@components/RichText';
import { LinkGroupFromCMS } from '@root/cms/types';
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
    relationTo: string
    value: any // TODO: type this
  }[]
  backgroundColor?: string
  content?: RichTextType
  links?: LinkGroupFromCMS
}

export type AlertsType = Alert[]

export interface IAlerts {
  alerts: AlertsType
  globalAlerts?: AlertsType
  dismissAlert: (id: string) => void // eslint-disable-line no-unused-vars
  pageAlerts?: AlertsType
}

export const AlertsContext = createContext<IAlerts>({} as IAlerts);
export const useAlerts = (): IAlerts => useContext(AlertsContext);

export const AlertsProvider: React.FC<{
  alerts: AlertsType
  children: React.ReactNode
}> = (props) => {
  const {
    children,
    alerts
  } = props;

  const [cookies, setCookie] = useCookies();

  const getGlobalAlerts = useCallback((): AlertsType => {
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
  const getPageAlerts = useCallback((): AlertsType => {
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

  const dismissAlert = useCallback((alertID: string) => {
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
