export enum SignActionKind {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
  SURNAME = "SURNAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD",
  REMEMBER_ME = "REMEMBER_ME"
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
  remember_me: string;
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

export interface TRegistrationError {
  error_code: string | null;
}

export interface TRegistrationContext {
  setVerifMail: (e: boolean) => void;
  errorSetter: (e: TRegistrationError | null) => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  surname: string;
  lastname: string;
  img_hash_name: string;
  role: "student" | "teacher";
  external_status: "GOOGLE" | "OPEN_ID";
}

export interface UserSlice {
  user: User | null;
}

export interface TUserCheck {
  user: User | null;
  result: boolean;
}
