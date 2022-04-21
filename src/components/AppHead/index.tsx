import React from 'react';
import Head from 'next/head'
// import { Media } from '';

export const AppHead: React.FC<{
  image?: Media
}> = (props) => {
  const {
    image
  } = props;

  return (
    <Head>
      <title>
        My Website
      </title>
      <link
        rel="icon"
        href="/favicon.png"
      />
      <link
        rel="preload"
        // @ts-ignore
        imagesizes="1440px"
        imagesrcset={`/images/texture-1@2x.png 2x, /images/texture-1.png 1440w`}
        href={`/images/texture-1.png`}
        as="image"
        type="image/png"
      />
      {image && typeof image !== 'string' && image?.mimeType !== 'video/mp4' && (
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_API_URL}/media/${image?.filename}`}
        />
      )}
    </Head>
  )
}
