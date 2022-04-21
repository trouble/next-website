import React from 'react';
import { Props } from './types';

import classes from './index.module.scss';

const Tooltip: React.FC<Props> = (props) => {
  const { children, type, className } = props;

  const tooltipClasses = [
    classes.tooltip,
    className,
    classes[`type-${type}`],
  ].filter(Boolean).join(' ');

  const caretClasses = [
    classes.caret,
    classes[`caret-type-${type}`],
  ].filter(Boolean).join(' ');

  return (
    <aside className={tooltipClasses}>
      {children}
      <span className={caretClasses} />
    </aside>
  );
};

export default Tooltip;
