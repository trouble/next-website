import { ContentBlock, ContentBlockType } from './Content';
import { MediaContent, MediaContentBlockType } from './MediaContent';
import { ContentSlider, ContentSliderBlockType } from './ContentSlider';
import { EmbeddedForm, EmbeddedFormType } from './Form';
import { MediaBlock, MediaBlockType } from './MediaBlock';
import { MediaSlider, MediaSliderType } from './MediaSlider';
import { ArchiveBlock, ArchiveBlockType } from './Archive';

export type BlocksType = (
  ContentBlockType
  | ArchiveBlockType
  | MediaContentBlockType
  | MediaBlockType
  | ContentSliderBlockType
  | EmbeddedFormType
  | MediaSliderType
)[]

export const blocks = {
  content: ContentBlock,
  archive: ArchiveBlock,
  mediaContent: MediaContent,
  media: MediaBlock,
  contentSlider: ContentSlider,
  embeddedForm: EmbeddedForm,
  mediaSlider: MediaSlider,
}
