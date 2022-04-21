import React, { useEffect, useState } from 'react';

type Size = {
  width: number,
  height: number
}

type Resize = {
  size?: Size
}

export const useResize = (ref: React.MutableRefObject<null>): Resize => {
  const [size, setSize] = useState<Size>();

  useEffect(() => {
    let observer: any;

    const {
      current: currentRef,
    } = ref;

    if (currentRef) {
      observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const {
            contentBoxSize,
            contentRect, // for Safari iOS compatibility, will be deprecated eventually (see https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect)
          } = entry;

          let newWidth = 0;
          let newHeight = 0;

          if (contentBoxSize) {
            const newSize = Array.isArray(contentBoxSize) ? contentBoxSize[0] : contentBoxSize;

            if (newSize) {
              const { inlineSize, blockSize } = newSize;
              newHeight = inlineSize;
              newHeight = blockSize;
            }
          } else if (contentRect) {
            // see note above for why this block is needed
            const { width, height } = contentRect;
            newWidth = width;
            newHeight = height;
          }

          setSize({
            width: newWidth,
            height: newHeight
          });
        });
      });

      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref]);

  return {
    size,
  };
};
