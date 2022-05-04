// must remain a CommonJS module, both React and Node needs it (sitemap and redirects)
// this means we have to send through the 'currentCategory' which is a url param not accessible within node

module.exports.formatSlug = (reference, currentCategory) => {
  let slug = '';

  const {
    relationTo,
    value,
  } = reference;

  if (typeof value === 'object' && value !== null) {
    const {
      slug: referenceSlug,
      breadcrumbs,
    } = value;

    // pages could be nested, so use breadcrumbs
    if (relationTo === 'pages') {
      if (breadcrumbs) {
        const { url: lastCrumbURL = '' } = breadcrumbs?.[breadcrumbs.length - 1] || {}; // last crumb
        slug = lastCrumbURL;
      } else {
        slug = referenceSlug;
      }
    }

    if (relationTo === 'posts') {
      slug = `/posts/${referenceSlug}`;
    }
  }

  return slug;
}
