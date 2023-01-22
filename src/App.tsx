import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { UnauthorizedRoute } from "./components/UnauthorizedRoute";
import "./index.scss";
import { MainPage } from "./MainPage";
import { LoginPage } from "./pages/LoginPage";
import { ServersPage } from "./pages/ServersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route
          path="/login"
          element={
            <UnauthorizedRoute>
              <LoginPage />
            </UnauthorizedRoute>
          }
        />
        <Route
          path="/servers"
          element={
            <PrivateRoute>
              <ServersPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
