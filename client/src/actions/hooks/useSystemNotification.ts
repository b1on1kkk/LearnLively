import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store/store";
import { serviceMsgAcitons } from "../store/features/serviceMsgPayload.slice";

import { INITIAL_SERVICE_MESSAGE } from "../constants/MainApp/initialServiceMessage";

const useSystemNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const serviceMessage = useSelector(
    (state: RootState) => state.serviceMessage
  );

  const showTimeout = useRef<NodeJS.Timeout | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (serviceMessage.status) {
      if (showTimeout.current) clearTimeout(showTimeout.current);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);

      showTimeout.current = setTimeout(() => {
        dispatch(
          serviceMsgAcitons.serviceMsgInit({ ...serviceMessage, status: false })
        );
      }, 5000);

      closeTimeout.current = setTimeout(() => {
        dispatch(serviceMsgAcitons.serviceMsgInit(INITIAL_SERVICE_MESSAGE));
      }, 6000);
    }

    return () => {
      if (showTimeout.current) clearTimeout(showTimeout.current);
    };
  }, [serviceMessage]);

  return { showTimeout, closeTimeout };
};

export default useSystemNotification;
