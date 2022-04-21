import { Hyperlink } from "@components/Hyperlink";
import { Media } from "@components/Media";
import { Overlay } from "@components/Overlay";
import classes from './index.module.scss';
import { RichText } from "@components/RichText";
import { CardType } from "..";

export const FullBGCard: React.FC<CardType> = (props) => {
  const {
    media,
    link,
    useOverlay,
    richText
  } = props;

  return (
    <div className={classes.card}>
      <Media
        className={classes.background}
        mediaFromCMS={media}
        cmsImageSize="portrait"
        layout="intrinsic"
        objectFit="cover"
      />
      {useOverlay && (
        <Overlay />
      )}
      <Hyperlink
        linkFromCMS={link}
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
