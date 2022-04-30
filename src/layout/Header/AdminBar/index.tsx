import React, { useState } from 'react';
import { PayloadMeUser, PayloadAdminBarProps, PayloadAdminBar } from 'payload-admin-bar';
import classes from './index.module.scss';
import { BlockContainer } from '../../BlockContainer';
import { Logo } from '@components/Logo';

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const {
    adminBarProps = {}
  } = props;

  const [user, setUser] = useState<PayloadMeUser>();

  return (
    <div
      className={[
        classes.adminBar,
        user && classes.show
      ].filter(Boolean).join(' ')}
    >
      <BlockContainer className={classes.blockContainer} >
        <PayloadAdminBar
          devMode
          {...adminBarProps}
          cmsURL={process.env.NEXT_PUBLIC_API_URL}
          onAuthChange={setUser}
          className={classes.payloadAdminBar}
          classNames={{
            user: classes.user,
            logo: classes.logo,
            controls: classes.controls,
          }}
          logo={(
            <Logo
              color="#ffffff"
            />
          )}
          style={{
            position: 'relative',
            zIndex: 'unset',
            padding: 0,
            backgroundColor: 'transparent'
          }}
        />
      </BlockContainer>
    </div >
  )
}
