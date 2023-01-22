import reducer, { logout, AuthState } from "../store/slices/authSlice";

const initialState: AuthState = {
  username: "",
  isLoading: false,
  isAuthenticated: false,
  isFailed: false,
  error: "",
};

describe("Auth Slide", () => {
  it("should return the initial state", () => {
    const newState = reducer(undefined, { type: undefined });

    expect(newState).toEqual(initialState);
  });

  it("should handle logout", () => {
    const state = {
      ...initialState,
      username: "test",
      isAuthenticated: true,
    };
    const newState = reducer(state, logout);

    expect(newState).toEqual(initialState);
  });
});
