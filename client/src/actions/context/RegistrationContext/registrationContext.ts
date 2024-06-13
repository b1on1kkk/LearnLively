import { createContext } from "react";

import type { TRegistrationContext } from "../../interfaces/Registration/Validation";

export const RegistrationContext = createContext<TRegistrationContext>({
  setVerifMail: () => {},
  errorSetter: () => {}
});
