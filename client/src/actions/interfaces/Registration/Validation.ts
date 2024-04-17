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

export interface TRegistrationError {
  error_code: string | null;
}

export interface TRegistrationContext {
  errorSetter: (e: TRegistrationError | null) => void;
}

export interface GlobalContent {
  user: User | null;
  userSetter: (c: User | null) => void;
}

interface RequestsSendedByUser {
  friend_id: number;
  status: "pending" | "rejected" | "accepted";
}
interface RequestsSendedToUser {
  user_id: number;
  status: "pending" | "rejected" | "accepted";
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  role: "student" | "teacher";
  email: string;
  img_hash_name: string;
  friends_friends_friend_idTousers: RequestsSendedToUser[];
  friends_friends_user_idTousers: RequestsSendedByUser[];
}

export interface TUserCheck {
  user: User | null;
  result: boolean;
}
