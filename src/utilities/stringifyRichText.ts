import { RichTextType } from "@components/RichText";

export const stringifyRichText = (richText: RichTextType) => {
  let string = '';

  richText.forEach((node) => {
    const { children } = node;

    children?.forEach((child) => {
      const { text } = child;
      if (text) {
        string = string.concat(' ', text);
      }
    });
  });

  return string;
};
