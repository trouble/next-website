import React from 'react';

import classes from './index.module.scss';

type LoadingCircleProps = {
  showLoader: boolean
  size?: 'small' | 'medium'
}

export const LoadingCircle: React.FC<LoadingCircleProps> = ({ showLoader, size = 'small' }) => {
  if (showLoader) {
    return (
      <div
        className={[
          classes.loadingCircle,
          classes[size]
        ].filter(Boolean).join(' ')}
      />
    )
  }
  return null;
};
