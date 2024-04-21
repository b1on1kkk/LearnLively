import type { User } from "../../interfaces/Registration/Validation";

export function checkIfUserExist(user: User) {
  const values = Object.values(user);
  for (let i = 1; i < values.length; i++) {
    if (values[i].replace(/\s+/g, "") === "") return false;
  }
  return true;
}
