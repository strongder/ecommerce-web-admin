import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const login = createAsyncThunk(
  "auth/login",
  async (authRequest) => {

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        authRequest
      );
      const token = response.data.token;
      const refreshToken = response.data.refreshToken;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      return response.data;
    } catch (error) {
      console.log("check",error);
    }
  }
);
const initialState = {
  token: localStorage.getItem("token") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  loading: "idle",
  error: null,
};

// Then, handle actions in your reducers:
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    logout: (state) => {
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        },
  },
  extraReducers: (builder) => {
    builder
        .addCase(login.pending, (state) => {
            state.loading = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = "idle";
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = "idle";
            state.error = action.payload;
        });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
