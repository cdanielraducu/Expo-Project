import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../models";

export interface UserState {
  user?: UserInfo;
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    onLogout(state) {
      state.user = undefined;
    }
  },
});

export const { onLogin, onLogout } = userSlice.actions;
export default userSlice.reducer;
