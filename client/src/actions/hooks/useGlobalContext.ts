import { useContext } from "react";

import { MyGlobalContext } from "../context/GlobalContext/globalContext";

const useGlobalContext = () => useContext(MyGlobalContext);

export default useGlobalContext;
