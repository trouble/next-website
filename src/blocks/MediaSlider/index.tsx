import React, { useEffect, useState } from 'react';
import classes from './index.module.scss'
import { Grid, Cell } from '@faceless-ui/css-grid'
import { SliderProvider, SliderTrack, Slide, SliderProgress, SliderButton } from '@faceless-ui/slider';
import { BlockContainer } from '@root/layout/BlockContainer';
import { useWindowInfo } from '@faceless-ui/window-info';
import { AnimateInOut } from '@components/AnimateInOut';
import { hasRichText } from '@root/utilities/hasRichText';
import { BackgroundColor } from '@components/BackgroundColor';
import { ArrowButton } from '@components/ArrowButton';
import { useGutter } from '@root/providers/GutterProvider';
import { base } from '@root/utilities/base';
import { BlockID } from '@components/BlockID';
import { RichText, RichTextType } from '@components/RichText';
import { Media } from '@components/Media';
import { PayloadMediaType } from '@root/cms/types';

export type Slide = {
  media?: PayloadMediaType
}

export type MediaSliderType = {
  blockType?: 'mediaSlider'
  blockName?: string
  introContent?: RichTextType
  slides?: Slide[]
}

export const MediaSlider: React.FC<MediaSliderType & {
  id?: string
}> = (props) => {
  const {
    introContent,
    slides,
    id,
    blockName
  } = props;

  const { gutter } = useGutter();
  const [backgroundWidth, setBackgroundWidth] = useState('');

  const {
    breakpoints: {
      m: midBreak,
    } = {}
  } = useWindowInfo();

  let slidesToShow = midBreak ? 0.9 : 3;

  useEffect(() => {
    if (slides) {
      // the sum of all the slides, plus gutter
      const slideRatio = slidesToShow > 1 ? slides.length / slidesToShow : slides.length * slidesToShow;
      let trackBackgroundWidth = `calc(${slideRatio * 100}% + ${gutter}px)`;

      if (midBreak) {
        trackBackgroundWidth = `calc(${slideRatio * 100}% - (${base(0.75)} * ${slideRatio}))`;
      }

      setBackgroundWidth(trackBackgroundWidth);
    }
  }, [
    slidesToShow,
    slides,
    gutter,
    midBreak
  ])

  if (slides && Array.isArray(slides) && slides.length > 0) {
    return (
      <SliderProvider
        slidesToShow={slidesToShow}
        scrollOffset={gutter}
        useFreeScroll
      >
        {() => {
          return (
            <div
              id={`block-${id}`}
              className={[
                classes.mediaSlider,
              ].filter(Boolean).join(' ')}
            >
              <BlockID id={blockName || id} />
              {hasRichText(introContent) && (
                <BlockContainer className={classes.intro}>
                  <Grid>
                    <Cell
                      cols={10}
                      colsM={8}
                    >
                      <AnimateInOut>
                        <RichText content={introContent} />
                      </AnimateInOut>
                    </Cell>
                  </Grid>
                </BlockContainer>
              )}
              <AnimateInOut className={classes.trackWrapper}>
                <SliderTrack className={classes.sliderTrack} >
                  <div
                    className={classes.background}
                    style={{
                      paddingLeft: gutter ? `${gutter / 2}px` : undefined,
                      width: backgroundWidth
                    }}
                  >
                    <div className={classes.backgroundWrapper}>
                      <BackgroundColor color="light-gray" />
                    </div>
                  </div>
                  {slides && slides.map((slide, index) => {
                    const {
                      media
                    } = slide;

                    return (
                      <Slide
                        key={index}
                        index={index}
                        className={[
                          classes.slide,
                          index < slides.length - 1 && classes.notLastSlide
                        ].filter(Boolean).join(' ')}
                        htmlAttributes={{
                          style: {
                            marginLeft: (!midBreak && index === 0) ? `${gutter / 2}px` : undefined
                          }
                        }}
                      >

                        <div className={classes.slideWrap}>
                          <Media mediaFromCMS={media} />
                        </div>
                      </Slide>
                    )
                  })}
                </SliderTrack>
              </AnimateInOut>
              <BlockContainer className={classes.controlsGrid}>
                <div className={classes.controls}>
                  <div className={classes.arrows}>
                    <SliderButton
                      className={classes.arrow}
                      direction="prev"
                      htmlAttributes={{
                        'aria-label': 'Previous slide'
                      }}
                    >
                      <ArrowButton
                        htmlElement="div"
                        direction="left"
                        size={!midBreak ? 'large' : undefined}
                      />
                    </SliderButton>
                    <SliderButton
                      className={classes.arrow}
                      direction="next"
                      htmlAttributes={{
                        'aria-label': 'Next slide'
                      }}
                    >
                      <ArrowButton
                        htmlElement="div"
                        direction="right"
                        size={!midBreak ? 'large' : undefined}
                      />
                    </SliderButton>
                  </div>
                  <SliderProgress
                    className={classes.progress}
                    indicator={{
                      className: classes.progressIndicator
                    }}
                  />
                </div>
              </BlockContainer>
            </div>
          )
        }}
      </SliderProvider>
    )
  }
  return null
}
