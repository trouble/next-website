import { MenuDescription, MenuDescriptionType } from './MenuDescription';
import { MenuFeatureType } from './MenuFeature';
import { MenuLink } from './MenuLink';
import { MenuTitle } from './MenuTitle';
import { MenuFeature } from './MenuFeature';
import { MenuLinkType } from './MenuLink'

export type MenuBlockTypes =
  'menuDescription' |
  'menuFeature' |
  'menuLink';

export type MenuBlock = (
  MenuDescriptionType |
  MenuFeatureType |
  MenuLinkType
)[]

export const menuBlocks = {
  'menuTitle': MenuTitle,
  'menuFeature': MenuFeature,
  'menuDescription': MenuDescription,
  'menuLink': MenuLink
}
