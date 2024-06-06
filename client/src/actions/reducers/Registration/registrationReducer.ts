import {
  SignAction,
  SignActionKind,
  SignState
} from "../../interfaces/Registration/Validation";

export function signReducer(state: SignState, action: SignAction) {
  const { type, payload } = action;
  switch (type) {
    case SignActionKind.NAME:
      return {
        ...state,
        name: payload
      };
    case SignActionKind.LASTNAME:
      return {
        ...state,
        lastname: payload
      };
    case SignActionKind.SURNAME:
      return {
        ...state,
        surname: payload
      };
    case SignActionKind.EMAIL:
      return {
        ...state,
        email: payload
      };
    case SignActionKind.PASSWORD:
      return {
        ...state,
        password: payload
      };
    case SignActionKind.REMEMBER_ME:
      return {
        ...state,
        remember_me: payload
      };

    default:
      return state;
  }
}
