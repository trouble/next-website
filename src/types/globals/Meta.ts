import { SocialMediaLinksType } from '@components/SocialMediaLinks';
import { LinkType, PayloadDoc } from '..';
import { PayloadMediaType } from '../Media';

export type GlobalMeta = {
  socialMediaLinks?: SocialMediaLinksType
  legalLinks?: {
    link: LinkType
  }[]
  locations?: Location[]
  phone?: string
  nationalPhone?: string
  fax?: string
  popularSearchTerms: {
    term: string
  }[]
  fallbackImage?: PayloadMediaType
  contactPage?: PayloadDoc
}
