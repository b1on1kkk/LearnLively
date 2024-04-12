import {
  FormValidityAction,
  FormValidityState,
  WhatToValidity
} from "../../interfaces/Registration/Validation";

export function formValidityReducer(
  state: FormValidityState,
  action: FormValidityAction
) {
  const { payload } = action;

  if (payload.key === WhatToValidity.VALIDATE_NAME) {
    return {
      ...state,
      nameError: payload.text.length === 0 ? true : false
    };
  } else if (payload.key === WhatToValidity.VALIDATE_LASTNAME) {
    return {
      ...state,
      lastnameError: payload.text.length === 0 ? true : false
    };
  } else if (payload.key === WhatToValidity.VALIDATE_EMAIL) {
    return {
      ...state,
      emailError:
        payload.text.includes("@") && payload.text.includes(".") ? false : true
    };
  } else if (payload.key === WhatToValidity.VALIDATE_PASSWORD) {
    return {
      ...state,
      passwordError: payload.text.length > 9 ? false : true
    };
  } else if (payload.key === WhatToValidity.VALIDATE_SURNAME) {
    return {
      ...state,
      surnameError: payload.text.length === 0 ? true : false
    };
  } else {
    return state;
  }
}
