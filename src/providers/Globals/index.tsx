import { FooterType, GlobalMeta, MainMenuType } from '@root/types/globals';
import React, {
  createContext,
  useContext,
} from 'react';

export interface IGlobals {
  mainMenu: MainMenuType,
  footer: FooterType,
  meta: GlobalMeta
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
