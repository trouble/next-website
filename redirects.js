const slugUtils = require('./src/utilities/formatSlug');
const { formatSlug } = slugUtils;

module.exports = async () => {
  const internetExplorerRedirect = {
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    destination: '/ie-incompatible.html',
  };

  return [
    internetExplorerRedirect
  ];

  // const redirectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redirects?limit=1000&depth=1`);
  // const redirectsData = await redirectsRes.json();

  // const { docs } = redirectsData;

  // let dynamicRedirects = [];

  // if (docs) {
  //   docs.forEach((doc) => {
  //     const {
  //       from,
  //       to: {
  //         type,
  //         url,
  //         reference,
  //       } = {}
  //     } = doc;

  //     let source = from.replace(process.env.NEXT_PUBLIC_APP_URL, '').split('?')[0];

  //     let destination = '/';

  //     if (type === 'custom' && url) {
  //       destination = url.replace(process.env.NEXT_PUBLIC_APP_URL, '');
  //     }

  //     if (type === 'reference' && reference?.value?.status === 'published') {
  //       destination = formatSlug(reference)
  //     }

  //     const redirect = {
  //       source,
  //       destination,
  //       permanent: true,
  //     }

  //     if (source.startsWith('/') && destination) {
  //       return dynamicRedirects.push(redirect)
  //     }
  //     return;
  //   })
  // }

  // const redirects = [
  //   internetExplorerRedirect,
  //   ...dynamicRedirects
  // ];

  // return redirects;
}
