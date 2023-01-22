import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../../api/auth";
import {
  deleteAuthCookie,
  isAuthCookieExists,
} from "../../services/cookie.service";
import { LoginCredentials } from "../../types/types";
import { RootState } from "../store";

export interface AuthState {
  username: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  isFailed: boolean;
  error: string;
}

const initialState: AuthState = {
  username: "",
  isLoading: false,
  isAuthenticated: isAuthCookieExists(),
  isFailed: false,
  error: "",
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data: LoginCredentials, { rejectWithValue }) => {
    try {
      await authAPI.login(data);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      deleteAuthCookie();

      state.isAuthenticated = false;
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginAsync.fulfilled,
        (state, action: PayloadAction<{ username: string }>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.username = action.payload.username;
        }
      )
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isFailed = true;
        state.error = (action.payload as { message: string }).message;
      });
  },
});

export const { logout } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
