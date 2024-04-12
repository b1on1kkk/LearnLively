import { SignState } from "../../interfaces/Registration/Validation";

export function percentageCalculator(
  state: SignState,
  policy: boolean,
  to_add: number
) {
  let percentage = 0;
  const values: string[] = Object.values(state);
  values.forEach((value) => {
    if (value.trim().replace(/\s+/g, "") !== "") {
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
