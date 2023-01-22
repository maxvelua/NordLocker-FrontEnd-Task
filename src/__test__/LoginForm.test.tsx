import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LoginForm } from "../components/LoginForm";
import { renderWithProviders } from "../utils/test-utils";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

const mockLogin = jest.fn(({ email, password }) => {
  return Promise.resolve({ email, password });
});

const setupComponent = (isFailed: boolean = false, error: string = "") =>
  renderWithProviders(
    <LoginForm onLoginClick={mockLogin} isFailed={isFailed} error={error} />
  );

describe("Login Form", () => {
  it("should render the login form with all fields and button", () => {
    setupComponent();

    const usernameField = screen.getByLabelText("User name");
    const passwordField = screen.getByLabelText("Password");
    const submitButton = screen.getByText("Login");

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should allow the user to submit the credentials", async () => {
    setupComponent();

    const username = "maxvel";
    const password = "qwerty";

    const usernameField = screen.getByLabelText("User name");
    const passwordField = screen.getByLabelText("Password");

    fireEvent.input(usernameField, {
      target: {
        value: username,
      },
    });

    fireEvent.input(passwordField, {
      target: {
        value: password,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockLogin).toBeCalledWith({ username, password });
    });
  });

  it("should display required error when value is invalid", async () => {
    setupComponent();

    const usernamePlaceholder = "Please enter the user name",
      passwordPlaceholder = "Please enter the password";

    let usernameField, passwordField;

    fireEvent.submit(screen.getByRole("button"));

    usernameField = await screen.findByPlaceholderText(usernamePlaceholder);
    passwordField = await screen.findByPlaceholderText(passwordPlaceholder);

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    await waitFor(() => {
      expect(mockLogin).not.toBeCalled();
    });
  });

  it("should display error message when login failed, isFailed == true", async () => {
    const isFailed = true;
    const error = "Login failed";

    setupComponent(isFailed, error);

    const username = "maxvel";
    const password = "qwerty";

    const usernameField = screen.getByLabelText("User name");
    const passwordField = screen.getByLabelText("Password");

    let errorMessage;

    fireEvent.input(usernameField, {
      target: {
        value: username,
      },
    });

    fireEvent.input(passwordField, {
      target: {
        value: password,
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    errorMessage = await screen.findByText(error);

    expect(errorMessage).toBeInTheDocument();
    await waitFor(() => {
      expect(mockLogin).toBeCalled();
    });
  });
});
