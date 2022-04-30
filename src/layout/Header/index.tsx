import { Fragment } from "react";
import classes from './index.module.scss';
import { DesktopHeader } from "./Desktop";
import { MobileHeader } from "./Mobile";
import { PayloadAdminBarProps } from 'payload-admin-bar';

export const Header: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const {
    adminBarProps
  } = props;

  return (
    <Fragment>
      <DesktopHeader
        className={classes.desktop}
      />
      <MobileHeader
        className={classes.mobile}
        adminBarProps={adminBarProps}
      />
    </Fragment>
  )
}
