import { Navigate } from "react-router-dom";
import { authState } from "../../store/slices/authSlice";
import { useAppSelector } from "../../hooks/hooks";

interface Props {
  children: JSX.Element;
}

export function PrivateRoute({ children }: Props) {
  const { isLoading, isAuthenticated } = useAppSelector(authState);

  if (isLoading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
