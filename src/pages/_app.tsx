import App, { AppContext, AppProps } from 'next/app';
import { GridProvider } from '@faceless-ui/css-grid'
import { ModalProvider } from '@faceless-ui/modal';
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { ScrollInfoProvider } from '@faceless-ui/scroll-info';
import { GlobalsProvider, IGlobals } from '@root/providers/Globals';
import { MainMenu } from '@root/layout/MainMenu';
import { SearchModal } from '@root/layout/SearchModal';
import { Footer } from '@root/layout/Footer';
import { CloseModalOnRouteChange } from '@components/CloseModalOnRouteChange';
import { Header } from '../layout/Header'
import { AppHead } from '@components/AppHead';
import { NotificationsProvider } from '@root/providers/Notifications';
import { AlertsType, AlertsProvider } from '@root/providers/Alerts';
import { CookiesProvider } from 'react-cookie'
import { PageTransition } from '@root/layout/PageTransition';
import { ModalContainer } from '@root/layout/ModalContainer';
import GutterProvider from '@root/providers/GutterProvider';
import cssVariables from '../cssVariables';
// import { useRouter } from 'next/router';
import { GoogleAnalytics } from '@components/GoogleAnalytics';
import { GoogleTagManager } from '@components/GoogleTagManager';
import HeaderHeightProvider from '@root/providers/HeaderHeight';
import { AlertBar } from '@root/layout/AlertBar';
import { BreadcrumbsProvider } from '@root/providers/Breadcrumbs';
import { SkipToContent } from '@root/layout/Header/SkipToContent';
import { dummyGlobals } from '../../public/dummyData/dummyGlobals'
import '../scss/app.scss';
import { getAllGlobals } from '@root/cms/api';

const MyApp = (appProps: AppProps & {
  globals: IGlobals,
  alerts: AlertsType
}): React.ReactElement => {
  const {
    Component,
    pageProps,
    globals,
    alerts
  } = appProps;

  const {
    breadcrumbs,
    // collection,
    // id,
    // preview,
  } = pageProps;

  // const router = useRouter();

  // const onPreviewExit = useCallback(() => {
  //   const exit = async () => {
  //     const exitReq = await fetch('/api/exit-preview');
  //     if (exitReq.status === 200) {
  //       router.reload();
  //     }
  //   }
  //   exit();
  // }, [router])

  return (
    <CookiesProvider>
      <AlertsProvider alerts={alerts}>
        <NotificationsProvider>
          <ScrollInfoProvider>
            <GlobalsProvider {...globals}>
              <WindowInfoProvider
                breakpoints={{
                  s: `(max-width: ${cssVariables.breakpoints.s}px)`,
                  m: `(max-width: ${cssVariables.breakpoints.m}px)`,
                  l: `(max-width: ${cssVariables.breakpoints.l}px)`,
                  xl: `(max-width: ${cssVariables.breakpoints.xl}px)`,
                }}
              >
                <GridProvider
                  breakpoints={{
                    s: cssVariables.breakpoints.s,
                    m: cssVariables.breakpoints.m,
                    l: cssVariables.breakpoints.l,
                  }}
                  rowGap={{
                    s: '1rem',
                    m: '1rem',
                    l: '4rem',
                    xl: '4rem',
                  }}
                  colGap={{
                    s: '10px',
                    m: '10px',
                    l: '4rem',
                    xl: '4rem',
                  }}
                  cols={{
                    s: 8,
                    m: 8,
                    l: 14,
                    xl: 16,
                  }}
                >
                  <GutterProvider>
                    <ModalProvider
                      classPrefix="mywebsite"
                      zIndex={9}
                      transTime={250}
                    >
                      <BreadcrumbsProvider breadcrumbs={breadcrumbs}>
                        <HeaderHeightProvider>
                          <AppHead image={globals?.meta?.fallbackImage} />
                          <GoogleTagManager />
                          <GoogleAnalytics />
                          <CloseModalOnRouteChange />
                          <PageTransition>
                            <SkipToContent />
                            <AlertBar pageProps={pageProps} />
                            <Header />
                            <Component {...pageProps} />
                            <Footer />
                          </PageTransition>
                          <ModalContainer />
                          <MainMenu />
                          <SearchModal popularSearchTerms={globals?.meta?.popularSearchTerms} />
                        </HeaderHeightProvider>
                      </BreadcrumbsProvider>
                    </ModalProvider>
                  </GutterProvider>
                </GridProvider>
              </WindowInfoProvider>
            </GlobalsProvider>
          </ScrollInfoProvider>
        </NotificationsProvider>
      </AlertsProvider>
    </CookiesProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const useDummyData = process.env.NEXT_PUBLIC_OFFLINE_MODE;

  let globals: IGlobals;

  if (useDummyData) {
    globals = dummyGlobals;
  } else {
    globals = await getAllGlobals();
  }

  return {
    ...appProps,
    globals
  };
};

export default MyApp;
