import { PayloadLink, PayloadMediaType } from '../../cms/types';

export type MenuFeature = {
  blockType?: 'menuFeature',
  blockName?: string
  media?: PayloadMediaType
  headline?: string
  link?: PayloadLink
}
