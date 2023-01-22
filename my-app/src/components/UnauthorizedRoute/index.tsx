import { Navigate } from "react-router-dom";
import { authState } from "../../store/slices/authSlice";
import { useAppSelector } from "../../hooks/hooks";

interface Props {
  children: JSX.Element;
}

export function UnauthorizedRoute({ children }: Props) {
  const { isAuthenticated } = useAppSelector(authState);

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
