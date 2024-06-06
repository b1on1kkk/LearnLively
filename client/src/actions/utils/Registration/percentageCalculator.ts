import { isBooleanString } from "../../type_guards/isBooleanString";

import type { SignState } from "../../interfaces/Registration/Validation";

export function percentageCalculator(
  state: SignState,
  policy: boolean,
  to_add: number
) {
  let percentage = 0;
  const values: string[] = Object.values(state);
  values.forEach((value) => {
    // if string is not empty and it is not "false" or "true" - add custom percentage
    if (value.trim().replace(/\s+/g, "") !== "" && !isBooleanString(value)) {
      percentage += to_add;
    }
  });

  if (policy && to_add !== 50) {
    percentage += to_add;
    if (percentage > 100) {
      const diff = percentage - 100;
      percentage -= diff;
    }
  }

  return percentage;
}
