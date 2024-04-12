import { useReducer, useState } from "react";
import { useFillPercentage } from "../../hooks/useFillPercentage";
import { useValidityCorrectness } from "../../hooks/useValidityCorrectness";

import { Button, Input, Progress, Switch } from "@nextui-org/react";
import { UserRound, Mail, KeyRound, Eye, EyeOff } from "lucide-react";

import { signReducer } from "../../reducers/Registration/registrationReducer";
import { formValidityReducer } from "../../reducers/Registration/formValidityReducer";

import { Link } from "react-router-dom";

import {
  SignActionKind,
  WhatToValidity
} from "../../interfaces/Registration/Validation";

import {
  FORM_VALIDITY_INITIAL,
  INITIAL_SIGN
} from "../../constants/Registration/signup";

export const Signup = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [state, dispatch] = useReducer(signReducer, INITIAL_SIGN);
  const [formValidity, setFormValidity] = useReducer(
    formValidityReducer,
    FORM_VALIDITY_INITIAL
  );
  const [policy, setPolicy] = useState<boolean>(false);

  const fillPercentage = useFillPercentage(state, policy, 17);
  const validityCorrectness = useValidityCorrectness(formValidity);

  return (
    <div className="px-52">
      <div className="mb-7">
        <h1 className="font-semibold text-2xl">Register</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex gap-5">
          <Input
            startContent={
              <UserRound className="opacity-50" width={20} height={20} />
            }
            type="name"
            label="Name"
            labelPlacement="outside"
            classNames={{ inputWrapper: "rounded-lg" }}
            placeholder="Your First Name"
            value={state.name}
            isInvalid={formValidity.nameError}
            errorMessage={formValidity.nameError && "Please enter a valid name"}
            onValueChange={(e) =>
              dispatch({ type: SignActionKind.NAME, payload: e })
            }
            onBlur={(e) => {
              const value = e as React.FocusEvent<HTMLInputElement, Element>;
              setFormValidity({
                payload: {
                  key: WhatToValidity.VALIDATE_NAME,
                  text: value.target.value
                }
              });
            }}
          />
          <Input
            startContent={
              <UserRound className="opacity-50" width={20} height={20} />
            }
            type="lastname"
            label="Lastname"
            labelPlacement="outside"
            classNames={{ inputWrapper: "rounded-lg" }}
            placeholder="Your Second Name"
            value={state.lastname}
            isInvalid={formValidity.lastnameError}
            errorMessage={
              formValidity.lastnameError && "Please enter a valid lastname"
            }
            onValueChange={(e) =>
              dispatch({ type: SignActionKind.LASTNAME, payload: e })
            }
            onBlur={(e) => {
              const value = e as React.FocusEvent<HTMLInputElement, Element>;
              setFormValidity({
                payload: {
                  key: WhatToValidity.VALIDATE_LASTNAME,
                  text: value.target.value
                }
              });
            }}
          />
        </div>

        <Input
          startContent={
            <UserRound className="opacity-50" width={20} height={20} />
          }
          type="surname"
          label="Surname"
          labelPlacement="outside"
          classNames={{ inputWrapper: "rounded-lg" }}
          placeholder="Your Third Name"
          value={state.surname}
          isInvalid={formValidity.surnameError}
          errorMessage={
            formValidity.surnameError && "Please enter a valid surname"
          }
          onValueChange={(e) =>
            dispatch({ type: SignActionKind.SURNAME, payload: e })
          }
          onBlur={(e) => {
            const value = e as React.FocusEvent<HTMLInputElement, Element>;
            setFormValidity({
              payload: {
                key: WhatToValidity.VALIDATE_SURNAME,
                text: value.target.value
              }
            });
          }}
        />

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

        <div className="flex items-center">
          <Switch
            size="sm"
            color="secondary"
            onValueChange={setPolicy}
          ></Switch>
          <p className="text-sm">
            I accept the{" "}
            <span className="font-semibold text-indigo-500 underline underline-offset-2 select-none">
              Terms of Service
            </span>{" "}
            as well as{" "}
            <span className="font-semibold text-indigo-500 underline underline-offset-2 select-none">
              Privacy Policy
            </span>
          </p>
        </div>

        <div className="mt-5 mb-5">
          {fillPercentage === 100 && validityCorrectness ? (
            <Button type="submit" color="secondary">
              Create Account
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
            Already have an account?{" "}
            <Link
              to={"/registration/login"}
              className="text-indigo-500 underline underline-offset-2"
            >
              Login now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
