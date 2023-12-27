import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../../common/types/auth";

const initialState: IAuthState = {
  //сущности
  user: {
    id: null,
    firstName: "",
    userName: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    watchList: [
      {
        id: null,
        name: "",
        assetId: "",
        createdAt: "",
        updatedAt: "",
        user: null,
      },
    ],
  },
  isLogged: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //редюсеры регистер, логин, логаут
    login(state, action) {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
}); //передаем объект с опциями

export const { login } = authSlice.actions;

export default authSlice.reducer;
