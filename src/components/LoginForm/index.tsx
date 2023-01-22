import "./style.scss";

import { useForm } from "react-hook-form";

import { LoginCredentials } from "../../types/types";

interface Props {
  onLoginClick: (data: LoginCredentials) => void;
  isFailed: boolean;
  error: string;
}

export function LoginForm({ onLoginClick, isFailed, error }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = (data: LoginCredentials) => {
    onLoginClick(data);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username" className="form__label">
            User name
          </label>
          <input
            id="username"
            autoComplete="username"
            placeholder={
              errors.username?.message ? "Please enter the user name" : ""
            }
            className={
              errors.username?.message
                ? "form__input form__input--error"
                : "form__input"
            }
            {...register("username", { required: "This is required" })}
          ></input>
        </div>
        <div>
          <label htmlFor="password" className="form__label">
            Password
          </label>
          <input
            id="password"
            autoComplete="current-password"
            placeholder={
              errors.password?.message ? "Please enter the password" : ""
            }
            className={
              errors.password?.message
                ? "form__input form__input--error"
                : "form__input"
            }
            type="password"
            {...register("password", { required: "This is required" })}
          ></input>
        </div>

        {isFailed && <p className="form__error-message">{error}</p>}

        <button className="form__button-submit" type="submit">
          Login
        </button>
      </form>
    </>
  );
}
