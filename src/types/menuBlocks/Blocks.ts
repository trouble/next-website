import { MenuDescriptionType } from '../menuBlocks/MenuDescription'
import { MenuFeature } from './MenuFeature';
import { MenuLinkType } from './MenuLink'

export type MenuBlockTypes =
  'menuDescription' |
  'menuFeature' |
  'menuLink';

export type MenuBlock = (
  MenuDescriptionType |
  MenuFeature |
  MenuLinkType
)[]
