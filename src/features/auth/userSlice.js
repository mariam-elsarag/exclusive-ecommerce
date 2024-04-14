import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});
export const { signIn, logOut } = userSlice.actions;
export default userSlice.reducer;
