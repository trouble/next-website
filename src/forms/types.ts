import React from 'react';

export type Validate = undefined | ((value: unknown) => boolean | string) // eslint-disable-line no-unused-vars

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Value | Property | Property[]
}

export interface OnSubmit {
  (data: Property, unflattenedData: Data): void | Promise<void> // eslint-disable-line no-unused-vars
}

export interface Field {
  valid?: boolean
  initialValue?: Value
  errorMessage?: string
  value?: Value
}

export interface InitialState {
  [key: string]: Field
}

export interface Fields {
  [key: string]: Field
}

export interface SetModified {
  (modified: boolean): void // eslint-disable-line no-unused-vars
}

export interface SetProcessing {
  (processing: boolean): void // eslint-disable-line no-unused-vars
}

export interface SetSubmitted {
  (submitted: boolean): void // eslint-disable-line no-unused-vars
}

interface REPLACE_STATE {
  type: 'REPLACE_STATE'
  state: Fields
}

interface REMOVE {
  type: 'REMOVE'
  path: string
}

interface REMOVE_ROW {
  type: 'REMOVE_ROW'
  path: string
  rowIndex: number
}

interface UPDATE {
  type: 'UPDATE'
  path: string
  value: Value
  initialValue?: Value
  errorMessage?: string
  valid: boolean
}

export type Action = REPLACE_STATE | REMOVE | REMOVE_ROW | UPDATE

export interface IContext {
  initialState: InitialState
  fields: Fields
  validateForm: () => boolean
  submit?: (e: React.ChangeEvent<HTMLFormElement>) => Promise<boolean> | void | false // eslint-disable-line no-unused-vars
  getFields: () => Fields
  getField: (path: string) => Field | undefined // eslint-disable-line no-unused-vars
  getData?: () => Data
  dispatchFields: React.Dispatch<Action>
  setModified: (modified: boolean) => void // eslint-disable-line no-unused-vars
  setProcessing: (processing: boolean) => void // eslint-disable-line no-unused-vars
  setSubmitted: (submitted: boolean) => void // eslint-disable-line no-unused-vars
}
