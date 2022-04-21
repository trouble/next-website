import { Fragment } from "react";
import classes from './index.module.scss';
import { DesktopHeader } from "./Desktop";
import { MobileHeader } from "./Mobile";

export const Header: React.FC = () => {
  return (
    <Fragment>
      <DesktopHeader
        className={classes.desktop}
      />
      {/* <MobileHeader
        className={classes.mobile}
      /> */}
    </Fragment>
  )
}
