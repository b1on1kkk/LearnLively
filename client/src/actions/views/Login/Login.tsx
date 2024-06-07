import { Link } from "react-router-dom";
import { useReducer, useState } from "react";

import { Mail, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button, Checkbox, Input, Progress, Spinner } from "@nextui-org/react";

import useLoginUser from "../../hooks/useLoginUser";
import useFillPercentage from "../../hooks/useFillPercentage";
import useValidityCorrectness from "../../hooks/useValidityCorrectness";
import useErrorHandling from "../../hooks/useRegistrationErrorHandling";

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
  const loginUser = useLoginUser();

  // hook that tracks if error was occured
  useErrorHandling(loginUser.error);

  const [isVisible, setIsVisible] = useState<boolean>(true);

  // validation
  const [state, dispatch] = useReducer(signReducer, INITIAL_SIGN);
  const [formValidity, setFormValidity] = useReducer(
    formValidityReducer,
    FORM_VALIDITY_INITIAL
  );

  // utils
  const fillPercentage = useFillPercentage(state, true, 50);
  const validityCorrectness = useValidityCorrectness(formValidity);

  return (
    <>
      <div className="mb-7">
        <h1 className="font-semibold text-2xl">Login</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          loginUser.mutate({
            email: state.email,
            password: state.password,
            remember_me: state.remember_me
          });
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
        <Checkbox
          size="md"
          radius="sm"
          color="primary"
          classNames={{ label: "text-small" }}
          isSelected={JSON.parse(state.remember_me)}
          onValueChange={(e) =>
            dispatch({ type: SignActionKind.REMEMBER_ME, payload: `${e}` })
          }
        >
          Remember me
        </Checkbox>
        <>
          {fillPercentage === 100 && validityCorrectness ? (
            <Button type="submit" color="secondary" className="min-w-[130px]">
              {loginUser.isPending ? (
                <Spinner size="sm" />
              ) : (
                <span> Login</span>
              )}
            </Button>
          ) : (
            <Progress
              label={
                fillPercentage === 100 && !validityCorrectness ? (
                  <span className="font-semibold text-red-700">
                    Check Correctness Of The Data!
                  </span>
                ) : (
                  "Filling Progress Bar"
                )
              }
              classNames={{ label: "text-sm font-semibold", value: "text-sm" }}
              showValueLabel={true}
              value={fillPercentage}
              size="sm"
            />
          )}
        </>
      </form>

      <button
        onClick={() => {
          window.open("http://localhost:3000/auth/google", "_self");
        }}
      >
        random button
      </button>

      <div className="mt-12">
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
    </>
  );
};
