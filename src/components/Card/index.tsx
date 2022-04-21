// import { Card as CardType } from "";
import { RichTextType } from "@components/RichText";
import { LinkType } from "@root/types";
import { PayloadMediaType } from "@root/types/Media";
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
  link?: LinkType
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
