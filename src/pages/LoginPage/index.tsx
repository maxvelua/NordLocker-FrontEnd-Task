import "./style.scss";

import { LoginForm } from "../../components/LoginForm";
import { LoginCredentials } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authState, loginAsync } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

export function LoginPage() {
  const { isLoading, isFailed, error } = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (data: LoginCredentials) => {
    dispatch(loginAsync(data))
      .unwrap()
      .then(() => navigate("/"))
      .catch((e) => e);
  };

  return (
    <div className="form__wrapper">
      {isLoading && <Loader />}
      <LoginForm onLoginClick={handleLogin} isFailed={isFailed} error={error} />
    </div>
  );
}
