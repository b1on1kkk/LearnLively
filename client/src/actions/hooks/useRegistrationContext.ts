import { useContext } from "react";

import { RegistrationContext } from "../context/RegistrationContext/registrationContext";

const useRegistrationContext = () => useContext(RegistrationContext);

export default useRegistrationContext;
