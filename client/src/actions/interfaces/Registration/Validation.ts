export enum SignActionKind {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
  SURNAME = "SURNAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD"
}

export interface SignAction {
  type: SignActionKind;
  payload: string;
}

export interface SignState {
  name: string;
  lastname: string;
  surname: string;
  email: string;
  password: string;
}

export enum WhatToValidity {
  VALIDATE_NAME = "VALIDATE_NAME",
  VALIDATE_LASTNAME = "VALIDATE_LASTNAME",
  VALIDATE_SURNAME = "VALIDATE_SURNAME",
  VALIDATE_EMAIL = "VALIDATE_EMAIL",
  VALIDATE_PASSWORD = "VALIDATE_PASSWORD"
}

export interface FormValidityState {
  nameError: boolean;
  lastnameError: boolean;
  surnameError: boolean;
  emailError: boolean;
  passwordError: boolean;
}

export interface FormValidityAction {
  payload: {
    text: string;
    key: string;
  };
}
