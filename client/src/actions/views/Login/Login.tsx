import { Link } from "react-router-dom";

import { useReducer, useState } from "react";
import { useFillPercentage } from "../../hooks/useFillPercentage";
import { useValidityCorrectness } from "../../hooks/useValidityCorrectness";

import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button, Input, Progress } from "@nextui-org/react";

import { signReducer } from "../../reducers/Registration/registrationReducer";
import { formValidityReducer } from "../../reducers/Registration/formValidityReducer";

import {
  FORM_VALIDITY_INITIAL,
  INITIAL_SIGN
} from "../../constants/Registration/signup";

import {
  SignActionKind,
  WhatToValidity
} from "../../interfaces/Registration/Validation";

export const Login = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [state, dispatch] = useReducer(signReducer, INITIAL_SIGN);
  const [formValidity, setFormValidity] = useReducer(
    formValidityReducer,
    FORM_VALIDITY_INITIAL
  );

  const fillPercentage = useFillPercentage(state, true, 50);
  const validityCorrectness = useValidityCorrectness(formValidity);

  return (
    <div className="px-52">
      <div className="mb-7">
        <h1 className="font-semibold text-2xl">Login</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-5"
      >
        <Input
          startContent={<Mail className="opacity-50" width={20} height={20} />}
          type="email"
          label="Email"
          labelPlacement="outside"
          classNames={{ inputWrapper: "rounded-lg" }}
          placeholder="Your Email"
          value={state.email}
          isInvalid={formValidity.emailError}
          errorMessage={formValidity.emailError && "Please enter a valid email"}
          onValueChange={(e) =>
            dispatch({ type: SignActionKind.EMAIL, payload: e })
          }
          onBlur={(e) => {
            const value = e as React.FocusEvent<HTMLInputElement, Element>;
            setFormValidity({
              payload: {
                key: WhatToValidity.VALIDATE_EMAIL,
                text: value.target.value
              }
            });
          }}
        />

        <Input
          startContent={
            <KeyRound className="opacity-50" width={20} height={20} />
          }
          endContent={
            <button type="button" onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <Eye className="opacity-50" width={20} height={20} />
              ) : (
                <EyeOff className="opacity-50" width={20} height={20} />
              )}
            </button>
          }
          type={isVisible ? "password" : "text"}
          label="Password"
          labelPlacement="outside"
          classNames={{ inputWrapper: "rounded-lg" }}
          placeholder="Your Password"
          value={state.password}
          autoComplete="true"
          isInvalid={formValidity.passwordError}
          errorMessage={
            formValidity.passwordError && "Please enter a valid password"
          }
          onValueChange={(e) =>
            dispatch({ type: SignActionKind.PASSWORD, payload: e })
          }
          onBlur={(e) => {
            const value = e as React.FocusEvent<HTMLInputElement, Element>;
            setFormValidity({
              payload: {
                key: WhatToValidity.VALIDATE_PASSWORD,
                text: value.target.value
              }
            });
          }}
        />

        <div className="mt-5 mb-5">
          {fillPercentage === 100 && validityCorrectness ? (
            <Button type="submit" color="secondary">
              Login
            </Button>
          ) : (
            <Progress
              label={
                fillPercentage === 100 && !validityCorrectness
                  ? "Check Correctness Of The Data!"
                  : "Filling Progress Bar"
              }
              classNames={{ label: "text-sm font-semibold", value: "text-sm" }}
              showValueLabel={true}
              value={fillPercentage}
              size="sm"
            />
          )}
        </div>

        <div>
          <p className="text-center text-gray-600 text-sm font-semibold">
            New to this web-app?{" "}
            <Link
              to={"/registration/signup"}
              className="text-indigo-500 underline underline-offset-2"
            >
              Create new account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
