import { useState } from "react";
import { Button, Chip, Image } from "@nextui-org/react";
import { Outlet, useLocation, Link } from "react-router-dom";

import { Notification } from "../../components/Notification";

import { Send, ShieldAlert } from "lucide-react";

import { RegistrationContext } from "../../context/RegistrationContext/registrationContext";

import { QUERY_ROOT } from "../../constants/Query/query";

import type { TRegistrationError } from "../../interfaces/Registration/Validation";

export const Registration = () => {
  const [verifMail, setVerifMail] = useState<boolean>(false);
  const [error, setError] = useState<TRegistrationError | null>(null);

  const location = useLocation();

  return (
    <main className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <Image
          isBlurred
          width={900}
          alt="Beautiful abstraction"
          src={`${QUERY_ROOT}api/pictures/_e07a3c3a-0c92-412c-be99-7246521246a3.jpg`}
          classNames={{
            wrapper: "rounded-s-3xl p-5"
          }}
        />
      </div>

      <RegistrationContext.Provider
        value={{ setVerifMail, errorSetter: setError }}
      >
        <div className="flex-1 flex justify-center flex-col items-center">
          <div className="w-[400px]">
            {error && (
              <Chip
                startContent={<ShieldAlert width={20} height={20} />}
                color="danger"
                classNames={{ base: "mb-5" }}
              >
                Sorry, but error occured:{" "}
                <span className="uppercase font-semibold">
                  {error.error_code}
                </span>
              </Chip>
            )}

            {location.pathname.split("/").length < 3 && (
              <div className="flex flex-col items-center">
                <div className="mb-7 text-lg font-semibold">
                  <h1>Nice To Meet You!</h1>
                </div>
                <div className="flex gap-5">
                  <Link to="login">
                    <Button className="min-w-[130px]" color="secondary">
                      Login
                    </Button>
                  </Link>

                  <Link to="signup">
                    <Button className="min-w-[130px]" color="secondary">
                      Create account
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {verifMail ? (
              <Notification
                icon={<Send width={80} height={80} />}
                message="Check your email. Verification mail was sent!"
              />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </RegistrationContext.Provider>
    </main>
  );
};
