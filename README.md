# NextJS Website Boilerplate

A [NextJS](https://nextjs.org) + [PayloadCMS](https://payloadcms.com) + [Faceless UI](https://faceless-ui.com) + [TypeScript](https://www.typescriptlang.org/) boilerplate for rapidly developing custom websites that are fast and scalable. Easily tie into any headless CMS.

Core features:
  - TypeScript
  - NextJS SSG starter pages and blog, including:
      - Nested pages
      - Static blog pagination
  - Media component that leverages NextImage optimization
  - Starter SCSS library
  - Comes pre-configured with:
    - Grid system
    - Sliders
    - Modals
    - Header
    - Header height watcher
    - Footer
    - Basic menu building blocks
    - Basic hero styles
    - Basic layout building blocks
    - Basic page transitions
    - Mega menu
    - Search menu
    - Forms
    - Alerts
    - Notifications
  - Includes common components like:
    - Video (Native HTML, YouTube SDK, Vimeo API)
    - Button
    - Hyperlink
    - Icon
    - Google Map
    - Google Analytics
    - Google Tag Manager
  - Serves a static styleguide
  - Server-side redirects
  - Supports XML sitemap export
  - Includes a starter content security policy

### Getting Started

After cloning the repo, cd into it and run `yarn` then `yarn dev`

You'll want to then configure a few basic things
  - Add your API, CMS, or CDN domains in `./csp.js`
  - Format your permalinks in `./src/utilities/formatPermalink.js`
  - Add your logo to `./src/components/Logo.tsx`
  - Update the color theme in `./src/scss/vars.scss` and `./src/cssVariables.js`
  - Remove or modify `./src/pages/posts` directory as necessary
  - If you're not using nested pages, you can remove all `breadcrumb` setup

### Production

When going to production, run `yarn build` then `yarn start`
