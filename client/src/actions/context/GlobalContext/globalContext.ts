import { createContext } from "react";

import type { GlobalContent } from "../../interfaces/Registration/Validation";

export const MyGlobalContext = createContext<GlobalContent>({
  user: {},
  asideMenuResize: false,
  userSetter: () => {},
  setAsideMenuResize: () => {}
});
