import { useState } from "react";

import type { GroupData } from "../interfaces/Students/Main";

const useGroupDataHandler = () => {
  const [groupHandler, setGroupHandler] = useState<GroupData>({
    title: "",
    description: ""
  });

  function groupDataHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setGroupHandler((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  return { groupDataHandler, groupHandler, setGroupHandler };
};

export default useGroupDataHandler;
