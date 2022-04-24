import { PayloadLink } from "../../cms/types"

export type MenuLinkType = {
  blockType?: 'menuLink',
  blockName?: string
  content?: string
  appearance?: 'primary' | 'secondary' | 'arrow'
  link?: PayloadLink
}
