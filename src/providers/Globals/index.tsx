import React, {
  createContext,
  useContext,
} from 'react';

export interface IGlobals {
  mainMenu: MainMenu,
  footer: Footer,
  meta: GlobalMeta
}

export const GlobalsContext = createContext<IGlobals>({} as IGlobals);
export const useGlobals = (): IGlobals => useContext(GlobalsContext);

export const GlobalsProvider: React.FC<IGlobals> = (props) => {
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
