import { Hyperlink } from "@components/Hyperlink";
import { Media } from "@components/Media";
import classes from './index.module.scss';
// import { Card as CardType } from '';
import { RichText } from "@components/RichText";
import InvertColorsProvider from "@root/providers/InvertColors";

export const InsetImageCard: React.FC<CardType> = (props) => {
  const {
    media,
    link,
    richText,
  } = props;

  return (
    <InvertColorsProvider isInverted={false}>
      <div className={classes.card}>
        <Hyperlink
          linkFromCMS={link}
          className={classes.anchor}
          htmlAttributes={{
            'aria-label': 'Link to page or post'
          }}
        >
          <div className={classes.imageWrapper}>
            <Media
              className={classes.image}
              mediaFromCMS={media}
              cmsImageSize="card"
            />
          </div>
          <div className={classes.content}>
            {richText && (
              <RichText content={richText} />
            )}
          </div>
        </Hyperlink>
      </div>
    </InvertColorsProvider>
  )
}
