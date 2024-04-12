import { FormValidityState } from "../../interfaces/Registration/Validation";

export function checkInputValidity(state: FormValidityState) {
  const values: boolean[] = Object.values(state);

  for (let i = 0; i < values.length; i++) {
    if (values[i]) return false;
  }

  return true;
}
