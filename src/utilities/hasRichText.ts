import { RichTextType } from "@components/RichText";

export const hasRichText = (richText?: RichTextType) => {
  return !(richText?.length === 1 && richText?.[0]?.children?.length === 1 && richText?.[0]?.children?.[0]?.text === '');
}
