import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// NOTE: don't fire during search queries or hash changes
// maintain a top-level path that excludes these params
export const sanitizePath = (url: string) => {
  let path = url.split('?')[0];
  path = path.split('#')[0];
  return path;
}

export const usePageTransition = () => {
  const { asPath } = useRouter();
  const [, setPrevPath] = useState<string | undefined>();
  const [path, setPath] = useState(() => sanitizePath(asPath));

  useEffect(() => {
    const pathWithoutQuery = sanitizePath(asPath);
    setPath(pathWithoutQuery);
  }, [asPath]);

  useEffect(() => {
    setPrevPath(path);
  }, [path]);

  return {
    transitionPath: path,
  }
}
