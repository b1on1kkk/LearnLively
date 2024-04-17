import { useEffect, useState } from "react";

import { percentageCalculator } from "../utils/Registration/percentageCalculator";

import type { SignState } from "../interfaces/Registration/Validation";

const useFillPercentage = (
  state: SignState,
  policy: boolean,
  to_add: number
) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    setFillPercentage(percentageCalculator(state, policy, to_add));
  }, [state, policy, to_add]);

  return fillPercentage;
};

export default useFillPercentage;
