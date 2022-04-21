import React from 'react';
import heros from '../../heros';
import { Hero as HeroType } from '../../types/Hero';

export const Hero: React.FC<HeroType> = (props) => {
  const { type, publishedDate, categories } = props;

  if (type && type in heros) {
    const SelectedHero = heros[type];
    const heroProps = props[type];

    return (
      // @ts-ignore because of the 'type' key not aligning across hero types
      <SelectedHero
        {...heroProps}
        publishedDate={publishedDate}
        categories={categories}
      />
    )
  }
  return null;
}
