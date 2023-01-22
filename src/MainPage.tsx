import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { authState, logout } from "./store/slices/authSlice";

export function MainPage() {
  const { isAuthenticated } = useAppSelector(authState);
  const dispatch = useAppDispatch();

  function handleLogoutClick() {
    dispatch(logout());
  }

  return (
    <div className="wrapper">
      <Header
        onLogoutClick={handleLogoutClick}
        isAuthenticated={isAuthenticated}
      />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
