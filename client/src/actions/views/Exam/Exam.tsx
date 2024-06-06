import { useLocation } from "react-router-dom";

import { InDevelopmentTemplate } from "../../components/InDevelopmentTemplate/InDevelopmentTemplate";

export const Exam = () => {
  const { pathname } = useLocation();

  return <InDevelopmentTemplate route={pathname.split("/")[1]} />;
};
