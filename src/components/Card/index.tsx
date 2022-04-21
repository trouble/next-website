// import { Card as CardType } from "";
import { FullBGCard } from "./FullBG";
import { InsetImageCard } from "./InsetImage";
import { NoImageCard } from "./NoImage";

const cards = {
  insetImage: InsetImageCard,
  fullBG: FullBGCard,
  noImage: NoImageCard
}

export const Card: React.FC<CardType> = (props) => {
  const {
    appearance = 'fullBG',
  } = props;

  const CardToUse = cards[appearance];

  return <CardToUse  {...props} />
}
