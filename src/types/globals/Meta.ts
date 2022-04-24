import { SocialMediaLinksType } from '@components/SocialMediaLinks';
import { PayloadLink, PayloadDoc, PayloadMediaType } from '../../cms/types';

export type GlobalMeta = {
  socialMediaLinks?: SocialMediaLinksType
  legalLinks?: {
    link: PayloadLink
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
