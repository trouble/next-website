
import { FullscreenBackgroundHeroType } from "../heros/FullscreenBackground";
import { BasicHeroType } from "../heros/Basic";
import { PayloadPostCategories } from "@root/cms/types";

export type HeroTypes = 'basic' |
  'basic' |
  'fullscreenBackground'

export type HeroType = {
  type?: HeroTypes
  showBreadcrumbs?: boolean
  basic?: BasicHeroType
  fullscreenBackground?: FullscreenBackgroundHeroType
  publishedDate?: string
  categories?: PayloadPostCategories
}
