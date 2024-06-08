import { QUERY_ROOT } from "../../constants/Query/query";

import google_icon from "../../../assets/google.png";

export const RegistrationGoogleButton = ({
  type
}: {
  type: "signup" | "login";
}) => {
  return (
    <div>
      <div className="my-3 text-center">
        <span className="text-small">or</span>
      </div>

      <button
        onClick={() =>
          window.open(
            `${QUERY_ROOT}auth/google?auth_type=${encodeURIComponent(
              JSON.stringify({ type })
            )}`,
            "_self"
          )
        }
        className="flex text-small p-2 items-center gap-3 bg-primary-400 rounded-medium w-full justify-center hover:bg-primary-300 transition-colors"
      >
        <span>
          <img src={google_icon} alt="google_icon" />
        </span>
        <span className="font-semibold">
          {type === "login" ? (
            <>Log in with Google</>
          ) : (
            <>Sign up with Google</>
          )}
        </span>
      </button>
    </div>
  );
};
