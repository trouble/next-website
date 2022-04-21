import { ContentBlock } from './Content';
import { MediaContent } from './MediaContent';
import { ContentSlider } from './ContentSlider';
import { EmbeddedForm } from './Form';
import { MediaBlock } from './MediaBlock';
import { MediaSlider } from './MediaSlider';
import { ArchiveBlock } from './Archive';

export const blocks = {
  content: ContentBlock,
  archive: ArchiveBlock,
  mediaContent: MediaContent,
  media: MediaBlock,
  contentSlider: ContentSlider,
  embeddedForm: EmbeddedForm,
  mediaSlider: MediaSlider,
}
