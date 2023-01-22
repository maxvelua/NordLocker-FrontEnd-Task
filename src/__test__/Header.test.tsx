import { PreloadedState } from "@reduxjs/toolkit";
import { fireEvent, screen } from "@testing-library/react";
import { Header } from "../components/Header";
import { RootState } from "../store/store";
import { renderWithProviders } from "../utils/test-utils";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  Link: (props: any) => {
    return <a {...props} href={props.to} />;
  },
}));

const mockLogout = jest.fn(() => {});

const defaultState: PreloadedState<RootState> = {
  auth: {
    username: "",
    isLoading: false,
    isAuthenticated: false,
    isFailed: false,
    error: "",
  },
};

const setupComponent = (
  preloadedState: PreloadedState<RootState> = defaultState,
  isAuthenticated: boolean = false,
  handleLogoutClick: () => void = () => {}
) =>
  renderWithProviders(
    <Header
      onLogoutClick={handleLogoutClick}
      isAuthenticated={isAuthenticated}
    />,
    {
      preloadedState,
    }
  );

const setupAuthenticatedComponent = () => {
  const preloadedState: PreloadedState<RootState> = {
    auth: {
      username: "",
      isLoading: false,
      isAuthenticated: true,
      isFailed: false,
      error: "",
    },
  };

  setupComponent(preloadedState, true, mockLogout);
};

describe("Header", () => {
  it("should render the header with all links", () => {
    setupComponent();

    const main = screen.getByText("Main");
    const login = screen.getByText("Login");
    const mainLink = screen.getByRole("link", { name: "Main" });
    const loginLink = screen.getByRole("link", { name: "Login" });

    expect(main).toBeInTheDocument();
    expect(login).toBeInTheDocument();

    expect(mainLink).toHaveAttribute("href", "/");
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  it("should expand menu when user click hamburger", () => {
    setupComponent();

    const hamburger = screen.getByTestId("hamburger-menu");
    const headerMenu = screen.getByTestId("header-menu");

    fireEvent.click(hamburger);

    expect(headerMenu).toHaveClass("header__menu--expanded");
  });

  it("should hide menu when user click hamburger", () => {
    setupComponent();

    const hamburger = screen.getByTestId("hamburger-menu");
    const headerMenu = screen.getByTestId("header-menu");

    fireEvent.click(hamburger);
    fireEvent.click(hamburger);

    expect(headerMenu).toHaveClass("header__menu");
  });

  it("should render the header with all link for authenticated user", () => {
    setupAuthenticatedComponent();

    const main = screen.getByText("Main");
    const servers = screen.getByText("Servers");
    const logout = screen.getByText("Logout");

    const mainLink = screen.getByRole("link", { name: "Main" });
    const serversLink = screen.getByRole("link", { name: "Servers" });
    const logoutLink = screen.getByRole("link", { name: "Logout" });

    expect(main).toBeInTheDocument();
    expect(servers).toBeInTheDocument();
    expect(logout).toBeInTheDocument();

    expect(mainLink).toHaveAttribute("href", "/");
    expect(serversLink).toHaveAttribute("href", "/servers");
    expect(logoutLink).toHaveAttribute("href", "/");
  });

  it("should allow user to logout", () => {
    setupAuthenticatedComponent();

    const logoutLink = screen.getByRole("link", { name: "Logout" });

    fireEvent.click(logoutLink);

    expect(mockLogout).toHaveBeenCalled();
  });
});
