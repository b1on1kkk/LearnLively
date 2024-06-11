import parse from "html-react-parser";

import { useDispatch, useSelector } from "react-redux";

import useSystemNotification from "../../hooks/useSystemNotification";

import { Icon } from "../Icon";

import { AppDispatch, RootState } from "../../store/store";
import { serviceMsgAcitons } from "../../store/features/serviceMsgPayload.slice";

import { INITIAL_SERVICE_MESSAGE } from "../../constants/MainApp/initialServiceMessage";

export const ServiceNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const serviceMessage = useSelector((s: RootState) => s.serviceMessage);

  const { showTimeout, closeTimeout } = useSystemNotification();

  return (
    <div
      className={`absolute bottom-0 w-[300px] m-5 left-[40%] rounded-lg ${
        serviceMessage.text ? "flex" : "hidden"
      } bg-[#050615] ${
        serviceMessage.message_color
      } border-2 text-sm items-center px-3 py-2 z-10 translate-y-0 font-semibold gap-2 ${
        serviceMessage.status ? "animate-[popup_0.3s]" : "animate-[popuout_1s]"
      }`}
      onClick={() => {
        if (showTimeout.current) clearTimeout(showTimeout.current);
        if (closeTimeout.current) clearTimeout(closeTimeout.current);

        dispatch(serviceMsgAcitons.serviceMsgInit(INITIAL_SERVICE_MESSAGE));
      }}
    >
      <div>
        <Icon icon_name={serviceMessage.image} />
      </div>

      <div>{parse(serviceMessage.text)}</div>
    </div>
  );
};
