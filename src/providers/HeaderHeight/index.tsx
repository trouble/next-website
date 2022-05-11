import { useScrollInfo } from '@faceless-ui/scroll-info';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useReducer } from 'react';
import { StickyElement, stickyElementReducer, StickyElements } from './stickyElementReducer';

interface IHeaderHeight {
  headerHeight?: number
  alertsHeight?: number
  totalHeaderHeight?: number
  setHeaderHeight: (height: number) => void //eslint-disable-line no-unused-vars
  setAlertsHeight: (height: number) => void //eslint-disable-line no-unused-vars
  reportStickyElement: (element: StickyElement) => void //eslint-disable-line no-unused-vars
  stickyElements?: StickyElements
}

export const HeaderHeightContext = createContext<IHeaderHeight>({} as IHeaderHeight);
export const useHeaderHeight = (): IHeaderHeight => useContext(HeaderHeightContext);

const HeaderHeightProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [stickyElements, dispatchStickyElement] = useReducer(stickyElementReducer, {});
  const [headerHeight, setHeaderHeight] = useState<number>();
  const [alertsHeight, setAlertsHeight] = useState<number>();
  const [total, setTotal] = useState<number>();

  const { y: scrollY } = useScrollInfo();

  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', `${total}px`);
  }, [total])

  useEffect(() => {
    const allHeights = (headerHeight || 0) + (alertsHeight || 0);
    let newTotal;

    // TODO: remove current scroll distance while approaching total scroll
    if (scrollY < allHeights) {
      newTotal = allHeights;
    } else {
      // only sticky elements now
      if (stickyElements) {
        let totalStickyHeight = 0;
        Object.entries(stickyElements).forEach(([, element]) => {
          const { height } = element;
          totalStickyHeight += height || 0;
        });
        newTotal = totalStickyHeight;
      }
    }
    setTotal(newTotal);
  }, [
    headerHeight,
    alertsHeight,
    scrollY,
    stickyElements
  ]);

  const reportStickyElement = useCallback((payload: StickyElement) => {
    dispatchStickyElement({
      type: 'ADD_STICKY_ELEMENT',
      payload
    })
  }, [])

  return (
    <HeaderHeightContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        alertsHeight,
        setAlertsHeight,
        totalHeaderHeight: total,
        reportStickyElement,
        stickyElements
      }}
    >
      {children}
    </HeaderHeightContext.Provider>
  );
};

export default HeaderHeightProvider;
