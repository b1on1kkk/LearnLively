import { useContext } from "react";
import { RegistrationContext } from "../context/Registration/registrationContext";

const useRegistrationContext = () => useContext(RegistrationContext);

export default useRegistrationContext;
