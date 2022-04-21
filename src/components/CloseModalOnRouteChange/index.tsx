import React, { useEffect } from 'react';
import { useModal } from '@faceless-ui/modal';
import { useRouter } from 'next/router';

export const CloseModalOnRouteChange: React.FC = () => {
  const { closeAll } = useModal();
  const { asPath } = useRouter();

  useEffect(() => {
    closeAll();
  }, [asPath, closeAll]);

  return null;
}
