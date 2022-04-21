import React from 'react';
import { ModalContainer as FacelessModalContainer, useModal } from '@faceless-ui/modal';
import { BackgroundColor } from '@components/BackgroundColor';
import classes from './index.module.scss'

export const ModalContainer = () => {
  const { currentModal } = useModal();

  let backgroundColor = 'transparent';
  if (currentModal) backgroundColor = "themeDark";
  if (currentModal === 'language-assistance') backgroundColor = 'trans-black';
  if (currentModal === 'instagram-feed') backgroundColor = 'trans-black-2'

  return (
    <FacelessModalContainer className={classes.modalContainer}>
      <BackgroundColor color={backgroundColor} />
    </FacelessModalContainer>
  )
}
