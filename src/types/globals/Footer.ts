import { PayloadLink } from "../../cms/types"

export type FooterMenuLinkType = {
  appearance?: 'primary' | 'secondary' | 'tertiary'
  label?: string
  useLink?: boolean
  link?: PayloadLink
}

export type FooterType = {
  column1?: FooterMenuLinkType[]
  column2?: FooterMenuLinkType[]
}
