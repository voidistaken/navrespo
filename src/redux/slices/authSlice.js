import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: Boolean(window.localStorage.getItem("AUTHENTICATED")),
    user: null,
    token: window.localStorage.getItem("token"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      window.localStorage.setItem("AUTHENTICATED", false);
      window.localStorage.removeItem("token");
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      window.localStorage.setItem("AUTHENTICATED", action.payload);
    },
  },
});
export const getUser = (state) => state.auth.user;
export const { setUser, setAuthenticated, logout, setToken } =
  authSlice.actions;
export default authSlice.reducer;
