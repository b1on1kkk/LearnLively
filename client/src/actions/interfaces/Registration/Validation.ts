import { Student } from "../Students/Main";

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
  user: Student | Record<string, never>;
  userSetter: (c: Student) => void;
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  surname: string;
  role: "student" | "teacher";
  email: string;
  end_semester: number;
  now_semester: number;
  department: string;
  img_hash_name: string;
}

export interface TUserCheck {
  user: Student;
  result: boolean;
}
