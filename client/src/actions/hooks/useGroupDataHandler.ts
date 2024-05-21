import { useEffect, useState } from "react";

import type { GroupData } from "../interfaces/Students/Main";

const useGroupDataHandler = <T>(trigger: T) => {
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

  // trigger to clear all data when user close new group modal
  useEffect(() => {
    const { description, title } = groupHandler;

    if (description.trim() !== "" || (title.trim() !== "" && !trigger)) {
      setGroupHandler({ title: "", description: "" });
    }
  }, [trigger]);

  return { groupDataHandler, groupHandler };
};

export default useGroupDataHandler;
