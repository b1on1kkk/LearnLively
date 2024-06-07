import { QUERY_ROOT } from "../../constants/Query/query";

import google_icon from "../../../assets/google.png";

export const RegistrationGoogleButton = ({
  type
}: {
  type: "signup" | "login";
}) => {
  return (
    <button
      onClick={() => window.open(`${QUERY_ROOT}auth/google`, "_self")}
      className="flex text-small p-2 items-center gap-3 bg-indigo-700 rounded-lg w-full mt-5 justify-center"
    >
      <span>
        <img src={google_icon} alt="google_icon" />
      </span>
      <span className="font-semibold">
        {type === "login" ? <>Log in with Google</> : <>Sign up with Google</>}
      </span>
    </button>
  );
};
