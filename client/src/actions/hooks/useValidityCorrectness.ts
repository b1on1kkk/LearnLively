import { useEffect, useState } from "react";

import { checkInputValidity } from "../utils/Registration/checkInputValidity";
import type { FormValidityState } from "../interfaces/Registration/Validation";

export const useValidityCorrectness = (state: FormValidityState) => {
  const [validityCorrectness, setValidityCorrectness] = useState(true);

  useEffect(() => {
    setValidityCorrectness(checkInputValidity(state));
  }, [state]);

  return validityCorrectness;
};
