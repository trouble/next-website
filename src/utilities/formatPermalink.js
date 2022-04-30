// must remain a CommonJS module, both React and Node needs it (sitemap and redirects)
// this means we have to send through the 'currentCategory' which is a url param not accessible within node

module.exports.formatPermalink = (reference, currentCategory) => {
  let permalink = '';

  const {
    relationTo,
    value,
  } = reference;

  if (typeof value === 'object' && value !== null) {
    const {
      slug,
      breadcrumbs,
    } = value;

    // pages could be nested, so use breadcrumbs
    if (relationTo === 'pages') {
      if (breadcrumbs) {
        const { url: lastCrumbURL = '' } = breadcrumbs?.[breadcrumbs.length - 1] || {}; // last crumb
        permalink = lastCrumbURL;
      } else {
        permalink = slug;
      }
    }

    if (relationTo === 'posts') {
      permalink = `/posts/${slug}`;
    }
  }

  return permalink;
}
