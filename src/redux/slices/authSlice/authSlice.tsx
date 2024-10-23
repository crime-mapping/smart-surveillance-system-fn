import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userInfo = localStorage.getItem("userInfo"); 
const logState = localStorage.getItem("logState"); 

const parsedUserInfo = userInfo || 'null';

interface AuthState {
  userInfo: any | null;
  logState: boolean;
  token: string | null;
  tempToken: string | null; 
}

const initialState:AuthState = {
  userInfo: parsedUserInfo || null,
  logState:logState === 'true' || false,
  token: Cookies.get("jwt") || null,
  tempToken:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token?: string; tempToken?: string; user?: any }>) {
      if (action.payload.user) {
        state.userInfo = action.payload.user;
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      }

      if (action.payload.token) {
        state.token = action.payload.token;
        Cookies.set("jwt", action.payload.token);
      }

      if (action.payload.tempToken) {
        state.tempToken = action.payload.tempToken;
      }
    },
    logOut(state) {
      state.userInfo = null;
      state.token = null;
      state.tempToken = null;
      Cookies.remove("jwt");
      localStorage.removeItem("userInfo");
    }
  }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;