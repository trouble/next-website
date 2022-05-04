import { GetServerSideProps } from "next";
import fs from "fs";
import { formatSlug } from "@root/utilities/formatSlug";
import { DocFromCMS } from "@root/cms/types";
// import { Housing, Page, Person, Post } from "";
const path = require("path");

// TODO: add static pagination to the sitemap, i.e. /people/page/2
// and static post categories, i.e. /posts/CATEGORY and /posts/CATEGORY/page/2

const Sitemap = () => { };

const blacklistedPaths = [
  'api',
]

const blacklistedPages = [
  '/sitemap.xml',
  '/.DS_Store',
  '/404',
  '/500',
  '/_error',
  '/_app',
  '/_document',
  '/styleguide',
];

const getCollection = async (collectionName: 'pages' | 'posts' | 'housing' | 'people') => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${collectionName}?limit=1000&depth=0`);
  const data = await res.json();
  const { docs } = data;
  if (docs) {
    return docs.map((doc: DocFromCMS) => {
      const {
        updatedAt
      } = doc;

      const permalink = formatSlug({
        relationTo: collectionName,
        value: doc
      }); // TODO: create a permalink for every category of a post (i.e. /posts/slug, /posts/cat1/slug, posts/cat2/slug, etc)

      return {
        path: `${process.env.NEXT_PUBLIC_APP_URL}${permalink}`,
        lastModified: updatedAt
      }
    })
  }

  return [];
}

const getDynamicPages = async () => {
  const pages = await getCollection('pages');
  const posts = await getCollection('posts');
  const housing = await getCollection('housing');
  const people = await getCollection('people');

  return [
    ...pages,
    ...posts,
    ...housing,
    ...people
  ];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;

  const getStaticPages = () => {
    const paths: {
      path: string
      lastModified: string
    }[] = [];

    const pathToPagesDir: string = process.env.NODE_ENV === 'production' ? '.next/server/pages' : 'src/pages';

    const recursivelyGetPages = (directoryPath: string) => {
      const directory = fs.readdirSync(directoryPath);

      directory.forEach(fileName => {
        const pathIsBlacklisted = blacklistedPaths.includes(fileName);
        const isDynamic = fileName.startsWith('[');

        if (!pathIsBlacklisted && !isDynamic) {
          const fileExt = path.extname(fileName);
          const isJSFile = fileExt === ".js" || fileExt === '.tsx';
          const fullPath = path.join(directoryPath, fileName);

          if (isJSFile) {
            if (!pathIsBlacklisted) {
              let permalink = fullPath
                .replace(pathToPagesDir, '')
                .replace('.tsx', '')
                .replace('.js', '');


              if (permalink.endsWith('/index')) permalink = permalink.replace('/index', '');

              const pageIsBlacklisted = blacklistedPages.includes(permalink);

              if (permalink && !pageIsBlacklisted) {
                return paths.push({
                  path: `${process.env.NEXT_PUBLIC_APP_URL}${permalink}`,
                  lastModified: new Date().toISOString()
                });
              }
            }
          } else {
            const isDirectory = fs.statSync(fullPath).isDirectory();

            if (isDirectory) {
              return recursivelyGetPages(fullPath);
            }
          }
        }
        return
      });
    }

    recursivelyGetPages(pathToPagesDir);

    return paths;
  }

  const staticPaths = getStaticPages();
  const dynamicPaths = await getDynamicPages();

  const allPaths = [
    ...staticPaths,
    ...dynamicPaths
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths.map((page) => {
    const {
      path,
      lastModified
    } = page;

    return `
            <url>
              <loc>${path}</loc>
              <lastmod>${lastModified}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
  })
      .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
