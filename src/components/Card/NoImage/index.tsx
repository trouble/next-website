import { Hyperlink } from "@components/Hyperlink";
import classes from './index.module.scss';
// import { Card as CardType } from '';
import { RichText } from "@components/RichText";
import { CardType } from "..";

export const NoImageCard: React.FC<CardType> = (props) => {
  const {
    link,
    richText,
  } = props;

  return (
    <div className={classes.card}>
      <Hyperlink
        linkFromCMS={link}
        className={classes.anchor}
        htmlAttributes={{
          'aria-label': 'Link to page or post'
        }}
      >
        <div className={classes.content}>
          {richText && (
            <RichText content={richText} />
          )}
        </div>
      </Hyperlink>
    </div>
  )
}
