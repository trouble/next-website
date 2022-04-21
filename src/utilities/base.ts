import getCSSVariable from "./getCSSVariable";

export const base = (multiplier = 1): string => {
  const htmlLineHeight = parseInt(getCSSVariable('html-line-height') || '', 10);
  const htmlFontSize = parseInt(getCSSVariable('html-font-size') || '', 10);
  return `${(htmlLineHeight / htmlFontSize) * multiplier}rem`
}
