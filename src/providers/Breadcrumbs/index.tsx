import React, {
  createContext,
  useContext,
  useState,
} from 'react';
import { Breadcrumb } from 'payload-plugin-nested-pages/dist/types'

import { useRouter } from 'next/router';

export interface IBreadcrumbs {
  breadcrumbs: Breadcrumb[],
  lastCrumb?: Breadcrumb | null,
  isHome?: boolean,
  showBreadcrumbs?: boolean
  setShowBreadcrumbs: (show?: boolean) => void // eslint-disable-line no-unused-vars
}

export const BreadcrumbsContext = createContext<IBreadcrumbs>({} as IBreadcrumbs);
export const useBreadcrumbs = (): IBreadcrumbs => useContext(BreadcrumbsContext);

export const BreadcrumbsProvider: React.FC<{
  breadcrumbs: Breadcrumb[]
  children: React.ReactNode
}> = (props) => {
  const {
    breadcrumbs,
    children
  } = props;

  const [showBreadcrumbs, setShowBreadcrumbs] = useState<boolean | undefined>(undefined);

  const { asPath } = useRouter();
  const isHome = asPath === breadcrumbs?.[0]?.url;

  return (
    <BreadcrumbsContext.Provider
      value={{
        breadcrumbs,
        isHome,
        showBreadcrumbs,
        setShowBreadcrumbs
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};
