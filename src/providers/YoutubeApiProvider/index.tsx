import * as React from 'react';
import NextHead from 'next/head';
import canUseDOM from '@root/utilities/canUseDOM';

export type YoutubeApiContext = {
  iframeApiReady: boolean
};

const Context = React.createContext<YoutubeApiContext | undefined>(undefined);

export const useYoutubeApi = () => {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useYoutubeApi must be used within a YoutubeApiProvider');
  }

  return context;
}

export const YoutubeApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [iframeApiReady, setIframeApiReady] = React.useState(false);

  React.useEffect(() => {
    if (!iframeApiReady) {
      window.onYouTubeIframeAPIReady = () => {
        setIframeApiReady(true);
      };
    }
  }, [iframeApiReady])

  return (
    <Context.Provider
      value={{
        iframeApiReady,
      }}
    >
      {canUseDOM && !window?.YT && (
        <NextHead>
          <script
            async
            type="text/javascript"
            src="https://www.youtube.com/iframe_api"
          />
        </NextHead>
      )}
      {children}
    </Context.Provider>
  )
}
