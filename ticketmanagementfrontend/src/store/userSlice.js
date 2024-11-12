// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Initialize user as null
  authToken: null, // Initialize authToken as null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.authToken = null;
    },
  },
});

export const { setUser, setAuthToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
