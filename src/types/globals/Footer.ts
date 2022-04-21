import { LinkType } from ".."

export type FooterMenuLinkType = {
  appearance?: 'primary' | 'secondary' | 'tertiary'
  label?: string
  useLink?: boolean
  link?: LinkType
}

export type FooterType = {
  column1?: FooterMenuLinkType[]
  column2?: FooterMenuLinkType[]
}
