import { AddressType } from '@components/Address';
import { SocialMediaLinksType } from '@components/SocialMediaLinks';
import { FooterType } from '@root/layout/Footer';
import { MainMenuType } from '@root/layout/MainMenu';
import React, { createContext, useContext } from 'react';
import { DocFromCMS, LinkFromCMS, PayloadMediaType } from '../../cms/types';
import { AlertsType } from '../Alerts';

export type GlobalMeta = {
  socialMediaLinks?: SocialMediaLinksType
  legalLinks?: {
    link: LinkFromCMS
  }[]
  locations?: AddressType[]
  phone?: string
  popularSearchTerms: {
    term: string
  }[]
  fallbackImage?: PayloadMediaType
  contactPage?: DocFromCMS
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
