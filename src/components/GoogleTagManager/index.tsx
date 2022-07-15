import React, { Fragment, useCallback, useEffect } from 'react';
import router from 'next/router';
import Script from 'next/script';

const gtmID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

declare global {
  interface Window { // eslint-disable-line no-unused-vars
    dataLayer: {
      push: (arg: any) => void;  // eslint-disable-line no-unused-vars
    }
  }
}

export const GoogleTagManager: React.FC = () => {
  const triggerPageView = useCallback((url: string) => {
    router.events.off('routeChangeComplete', () => {
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      })
    })
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', triggerPageView)
    return () => router.events.off('routeChangeComplete', triggerPageView)
  }, [
    triggerPageView
  ])

  if (gtmID) {
    return (
      <Fragment>
        {gtmID && (
          <Script
            strategy='lazyOnload'
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmID}');`
            }}
          />
        )}
        {gtmID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`}
              height="0"
              width="0"
              style={{
                display: 'none',
                visibility: 'hidden'
              }}
            >
            </iframe>
          </noscript>
        )}
      </Fragment>
    );
  }
  return null;
};
