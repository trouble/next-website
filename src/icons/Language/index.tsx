import React from 'react';
import classes from '../index.module.scss';

export const LanguageIcon: React.FC<{
  color?: string
  size?: string
  bold?: boolean
  className?: string
  rotation?: number
}> = (props) => {
  const {
    color,
    size,
    className,
    bold,
    rotation
  } = props;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 15 17"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        classes.icon,
        color && classes[color],
        size && classes[size],
        className,
        bold && classes.bold
      ].filter(Boolean).join(' ')}
      style={{ transform: rotation ? `rotate(${rotation}deg)` : undefined }}
    >
      <path d="M1.77393 4.25391H13.4424"
        className={classes.stroke}
      />
      <path d="M11.535 5.25391L11.4344 5.65625C10.24 10.4338 6.67714 14.2641 1.99829 15.8004V15.8004"
        className={classes.stroke}
      />
      <path
        d="M1.67681 15.8789L2.071 15.75C6.75178 14.2196 10.3195 10.3938 11.5199 5.61774V5.61774"
        className={classes.stroke}
      />
      <path
        d="M4.24226 7.72168L4.33873 8.11422C5.22528 11.7217 7.89937 14.6229 11.4229 15.7998V15.7998"
        className={classes.stroke}
      />
      <path
        d="M12.1334 15.9995L11.7462 15.8833C8.18819 14.8153 5.42612 11.9978 4.42902 8.41922V8.41922"
        className={classes.stroke}
      />
      <path d="M7.83252 4.14151V1"
        className={classes.stroke}
      />
    </svg>
  )
}
