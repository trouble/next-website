import { useWindowInfo } from '@faceless-ui/window-info';
import { BlockContainer } from '@root/layout/BlockContainer';
import React, {
  createContext,
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback
} from 'react';
import classes from './index.module.scss';

interface IGutter {
  blockContainerWidth: number
  gutter: number
}

export const GutterContext = createContext<IGutter>({} as IGutter);
export const useGutter = (): IGutter => useContext(GutterContext);

const GutterProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [blockContainerWidth, setBlockContainerWidth] = useState(0);
  const [gutter, setGutter] = useState(0)

  const { eventsFired: windowEvents } = useWindowInfo();

  const calculateGutter = useCallback(() => {
    const newContainerWidth = containerRef?.current?.offsetWidth || 0
    const newContentWidth = contentRef?.current?.offsetWidth || 0
    const newGutter = (newContainerWidth - newContentWidth) / 2;

    setBlockContainerWidth(newContainerWidth);
    setGutter(newGutter)
  }, [])

  useEffect(() => {
    if (windowEvents > 0) {
      calculateGutter();
    }
  }, [
    windowEvents,
    calculateGutter
  ])

  return (
    <GutterContext.Provider
      value={{
        blockContainerWidth,
        gutter
      }}
    >
      {children}
      <BlockContainer
        className={classes.gutter}
        ref={containerRef}
      >
        <div ref={contentRef} />
      </BlockContainer>
    </GutterContext.Provider>
  );
};

export default GutterProvider;
