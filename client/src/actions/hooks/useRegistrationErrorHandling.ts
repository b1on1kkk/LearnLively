import { useEffect } from "react";
import useRegistrationContext from "./useRegistrationContext";
import { errorPayload } from "../interfaces/Registration/errorPayload";
import { AxiosError } from "axios";

const useErrorHandling = (createUserError: AxiosError<errorPayload> | null) => {
  const { errorSetter } = useRegistrationContext();

  useEffect(() => {
    if (createUserError) {
      const error_text = createUserError.response?.data;

      if (error_text) {
        errorSetter({
          error_code: error_text.message
        });
        return;
      }

      errorSetter({
        error_code: "Server is gone to a void!"
      });
      return;
    }

    errorSetter(null);

    return () => errorSetter(null);
  }, [createUserError, errorSetter]);
};

export default useErrorHandling;
