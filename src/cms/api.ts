import { GlobalMeta, IGlobals } from "@root/providers/Globals";

// TODO: if in preview mode, add payload token and ?draft=true to the request
export const getByID = async ({
  collection,
  id
}: {
  collection?: string,
  id?: string
}) => {
  let doc = null;  // must use null, undefined cannot be serialized as JSON from getStaticProps

  if (typeof id === 'string') {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${collection}/${id}?depth=1`);
    const data = await req.json();
    doc = data;
  }

  return doc;
}

export const getBySlug = async ({
  collection,
  slug
}: {
  collection?: string,
  slug?: string
}) => {
  let doc = null;  // must use null, undefined cannot be serialized as JSON from getStaticProps

  if (typeof slug === 'string') {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${collection}?where[slug][equals]=${slug}&limit=1&depth=0`);
    const data = await req.json();
    const {
      docs: [firstDoc]
    } = data;
    doc = firstDoc;
  }

  return doc;
}


export const getPostCategoryBySlug = async (slug?: string) =>
  await getBySlug({
    collection: 'post-categories',
    slug
  });

export const getGlobalMeta = async (): Promise<GlobalMeta> => {
  let doc = null;
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/globals/meta?depth=1`);
  const data = await req.json();

  if (data) {
    doc = data;

    const {
      housingSubsite
    } = data;

    // attach full housing subsite
    if (housingSubsite?.id) {
      doc.housingSubsite = await getByID({
        collection: 'subsites',
        id: housingSubsite.id
      });
    }
  }

  return doc;
}

export const getAllGlobals = async (): Promise<IGlobals> => {
  const [
    mainMenu,
    footer,
    meta,
    alerts
  ] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/globals/mainMenu?depth=1`).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/globals/footer?depth=1`).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/globals/meta?depth=1`).then((res) => res.json()),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/alerts?depth=1`).then((res) => res.json()),
  ]);

  return {
    mainMenu,
    footer,
    meta,
    alerts: alerts.docs
  }
}

