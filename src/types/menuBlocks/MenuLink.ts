import { LinkType } from ".."

export type MenuLinkType = {
  blockType?: 'menuLink',
  blockName?: string
  content?: string
  appearance?: 'primary' | 'secondary' | 'arrow'
  link?: LinkType
}
