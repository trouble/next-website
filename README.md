# NextJS Website Boilerplate

A [NextJS](https://nextjs.org) front-end boilerplate for rapidly developing custom websites that are fast and scalable. Built specifically for a [PayloadCMS](https://payloadcms.com) API, for easily tie into any headless CMS.

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
    - Footer
    - Basic [layout building blocks](#layout-building-blocks)
    - Basic [menu building blocks](#menu-building-blocks)
    - Basic hero styles
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
    - Skip-to-content
  - [Offline mode](#offline-mode)
  - [Static styleguide](#static-styleguide)
  - Server-side redirects
  - Static XML sitemap
  - Starter content security policy

### Layout building blocks

This boilerplate includes a set of default layout building blocks for building dynamic page content. Included are the most common blocks for most projects, but you will need to add, remove, and modify these as necessary. Each block can have a varying degree of content and treatment and is fully responsive out of the box. Each block also has a corresponding page in the [styleguide](#styleguide) which renders the block in every of its variations — like minimum and maximum content, light and dark background, left and right alignment, etc.

Block-level animation is achieved using the `<AnimateInOut />` component. This component can wrap your entire block, or multiple elements within your block, to animate its appearance as it scrolls in and out of the viewport. This component is a lightweight wrapper around the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

When you need to render multiple blocks, consider using the `<Blocks>` component — this adds margin based on index, background color, etc. to standardize spacing between blocks and across pages. This pattern is also useful to ensure consistent block ids.

### Menu building blocks

Very similar to [layout building blocks](#layout-building-blocks) but for building dynamic menus. This may include mega menus, dropdown sub-menus, or footers. This boilerplate includes a set of very simple menu blocks that most projects would use, but you will need to add, remove, and modify these as necessary.

### Styleguide

A static UI styleguide is also available at `/styleguide`. This includes a page for each layout block. These pages are meant to represent all possible states of each block — like minimum and maximum content, light and dark background, left and right alignment, etc. The pages of the styleguide are not indexed by search engines, and provide a great place to troubleshoot UI even in production environments.

### Offline Mode

You can enter "offline mode" at any time to boot your app detached from any CMS. All data will be served statically from the [public directory](/public/dummyData), which includes working set of default pages, posts, and globals that simulate your API. You can edit these files as necessary while you customize your project. To turn this off, set `NEXT_PUBLIC_OFFLINE_MODE` to `false` in your `.env`.`

Offline mode can be useful in troubleshooting your app to rule out issues with your CMS by isolating your front-end. It is also useful when developing a front-end before your CMS is ready.

### Getting Started

After cloning the repo, `cd` into it and run `yarn` then `yarn dev`

Now visit `localhost:3000` in your browser and you should see the "getting started" page. By default, the app initializes in [offline mode](#offline-mode), which serves dummy data statically from your public folder. This is a great way develop your front-end detached from any CMS, while still simulating your API. To exit offline mode, set `NEXT_PUBLIC_OFFLINE_MODE` to `false` in your `.env`. You can also go to `localhost:3000/styleguide`, see [styleguide](#styleguide).

You'll want to then configure a few basic things
  - Add your API, CMS, or CDN domains to the [Content Security Policy](./csp.js)
  - Set `NEXT_PUBLIC_OFFLINE_MODE` to `false` in your `.env` if you have a working API
  - Format your [permalinks](./src/utilities/formatPermalink.js)
  - Update the [SCSS library](./src/scss/) (breakpoints, colors, fonts, etc)
  - Add your [Logo](./src/components/Logo/index.tsx)
  - Style your [Header](./src/layout/Header/index.tsx) and [Footer](./src/layout/Footer/index.tsx)
  - Remove, modify, or add [pages](./src/pages/) as necessary
  - Remove, modify, or add [blocks](./src/blocks/) as necessary
  - If you're not supporting nested pages, you can remove all `breadcrumb` setup (see `getStaticPaths` and `getStaticProps` on each page)

### Production

When going to production, run `yarn build` then `yarn start`
