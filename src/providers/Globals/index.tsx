import { SocialMediaLinksType } from '@components/SocialMediaLinks';
import { FooterType } from '@root/layout/Footer';
import { MainMenuType } from '@root/layout/MainMenu';
import React, { createContext, useContext } from 'react';
import { PayloadDoc, PayloadLink, PayloadMediaType } from '../../cms/types';
import { AlertsType } from '../Alerts';

export type GlobalMeta = {
  socialMediaLinks?: SocialMediaLinksType
  legalLinks?: {
    link: PayloadLink
  }[]
  locations?: Location[]
  phone?: string
  nationalPhone?: string
  fax?: string
  popularSearchTerms: {
    term: string
  }[]
  fallbackImage?: PayloadMediaType
  contactPage?: PayloadDoc
}

export interface IGlobals {
  mainMenu: MainMenuType,
  footer: FooterType,
  meta: GlobalMeta,
  alerts?: AlertsType
}

export const GlobalsContext = createContext<IGlobals>({} as IGlobals);
export const useGlobals = (): IGlobals => useContext(GlobalsContext);

export const GlobalsProvider: React.FC<IGlobals & {
  children: React.ReactNode
}> = (props) => {
  const {
    mainMenu,
    footer,
    meta,
    children
  } = props;

  return (
    <GlobalsContext.Provider
      value={{
        mainMenu,
        footer,
        meta
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};
