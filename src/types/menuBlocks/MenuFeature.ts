import { LinkType } from '..';
import { PayloadMediaType } from '../Media';

export type MenuFeature = {
  blockType?: 'menuFeature',
  blockName?: string
  media?: PayloadMediaType
  headline?: string
  link?: LinkType
}
