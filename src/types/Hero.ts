import { FullscreenBackgroundHeroType } from "../heros/FullscreenBackground";
import { BasicHeroType } from "../heros/Basic";
import { PostCategoriesType } from ".";

export type HeroTypes = 'basic' |
  'basic' |
  'fullscreenBackground'

export type Hero = {
  type?: HeroTypes
  showBreadcrumbs?: boolean
  basic?: BasicHeroType
  fullscreenBackground?: FullscreenBackgroundHeroType
  publishedDate?: string
  categories?: PostCategoriesType
}
