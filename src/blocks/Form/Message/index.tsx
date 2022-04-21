import React from "react";
import { MessageField } from "payload-plugin-form-builder/dist/types";
import { RichText, RichTextType } from "@components/RichText";
import classes from './index.module.scss';

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <div className={classes.message}>
      <RichText content={message as RichTextType} />
    </div>
  )
}
