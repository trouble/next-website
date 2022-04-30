// import { Card as CardType } from "";
import { RichTextType } from "@components/RichText";
import { LinkFromCMS, PayloadMediaType } from "@root/cms/types";
import { FullBGCard } from "./FullBG";
import { InsetImageCard } from "./InsetImage";
import { NoImageCard } from "./NoImage";

const cards = {
  insetImage: InsetImageCard,
  fullBG: FullBGCard,
  noImage: NoImageCard
}

export type CardAppearances = 'fullBG' | 'insetImage' | 'noImage'

export type CardType = {
  appearance?: CardAppearances
  richText?: RichTextType
  link?: LinkFromCMS
  media?: PayloadMediaType
  useOverlay?: boolean
}

export const Card: React.FC<CardType> = (props) => {
  const {
    appearance = 'fullBG',
  } = props;

  const CardToUse = cards[appearance];

  return <CardToUse  {...props} />
}
