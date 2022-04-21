// For information on Content Security Policy see https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// By default, Google, YouTube, Vimeo, Instagram, and Stripe APIs are allowed

const policies = {
  "default-src": ["'self'"],
  "media-src": [
    "'self'",
    // add any domains that this site will serve media from, such as a CMS or CDN
    // example: "https://your-cms.com",
  ],
  "img-src": [
    "'self'",
    "data:",
    // add any domains that this site will serve media from, such as a CMS or CDN
    // example: "https://your-cms.com"
    "https://maps.googleapis.com",
    "https://maps.gstatic.com",
    "https://i.ytimg.com",
    "https://i.vimeocdn.com",
    "https://scontent.cdninstagram.com",
    "https://cdninstagram.com",
    'https://www.google-analytics.com',
    "*.cdninstagram.com",
  ],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
  ],
  "font-src": [
    "'self'",
    "https://fonts.gstatic.com"
  ],
  "frame-src": [
    "'self'",
    "https://player.vimeo.com",
    "https://www.youtube.com",
    "https://assets.textrecruit.com",
    "https://vimeo.com",
    "https://js.stripe.com/"
  ],
  "script-src": [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "https://maps.googleapis.com",
    "https://youtube.com",
    "https://www.youtube.com",
    "https://www.googletagmanager.com",
    'https://www.google-analytics.com',
    "https://js.stripe.com"
  ],
  "connect-src": [
    "'self'",
    "ws://localhost:3000",
    // add any domains that this site will connect to, such as a CMS
    // example: "https://your-cms.com
    "https://maps.googleapis.com",
    'https://www.google-analytics.com',
    "https://graph.instagram.com",
  ],
  "object-src": [
    "'self'",
    "data:"
  ],
};

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(" ")}`;
    }
    return "";
  })
  .join("; ");
