import React, { useEffect, useState } from 'react';

type Intersection = {
  isIntersecting: boolean
  hasIntersected?: boolean
}

const useIntersection = ({
  ref,
  root,
  rootMargin,
  threshold,
  log
}: {
  ref: React.MutableRefObject<null>,
  root?: React.MutableRefObject<null>,
  rootMargin?: string,
  threshold?: number
  log?: boolean
}): Intersection => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasIntersected, setHasIntersected] = useState<boolean>();

  useEffect(() => {
    let observer: any;

    const {
      current: currentRef,
    } = ref;

    if (currentRef) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (log) console.log('entry', entry);
          setIsIntersecting(entry.isIntersecting);
        });
      }, {
        rootMargin: rootMargin || '0px',
        threshold: threshold || 0.05,
        root: root?.current || null
      });

      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    ref,
    rootMargin,
    threshold,
    root,
    log
  ]);

  useEffect(() => {
    if (isIntersecting) {
      setHasIntersected(true);
    }
  }, [isIntersecting]);

  return {
    isIntersecting,
    hasIntersected
  };
};

export default useIntersection;
