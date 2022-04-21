import { MenuDescription } from '../menuBlocks/MenuDescription'
import { MenuFeature } from './MenuFeature';
import { MenuLink } from './MenuLink'

export type MenuBlockTypes =
  'menuDescription' |
  'menuFeature' |
  'menuLink';

export type MenuBlock = (
  MenuDescription |
  MenuFeature |
  MenuLink
)[]
