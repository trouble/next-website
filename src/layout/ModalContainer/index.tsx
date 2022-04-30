import React from 'react';
import { ModalContainer as FacelessModalContainer, useModal } from '@faceless-ui/modal';
import { BackgroundColor } from '@components/BackgroundColor';
import classes from './index.module.scss'

export const ModalContainer = () => {
  const { currentModal } = useModal();

  let backgroundColor = 'transparent';
  if (currentModal) backgroundColor = "black";
  // NOTE: you can change the background or behavior of modals based on slug
  // if (currentModal.slug === 'mainMenu')

  return (
    <FacelessModalContainer className={classes.modalContainer}>
      <BackgroundColor color={backgroundColor} />
    </FacelessModalContainer>
  )
}
