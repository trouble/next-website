// import { RichText } from "";

export const hasRichText = (richText?: RichText) => {
  return !(richText?.length === 1 && richText?.[0]?.children?.length === 1 && richText?.[0]?.children?.[0]?.text === '');
}
