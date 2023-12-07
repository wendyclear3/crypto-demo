import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  //сущности
  user: {},
  isLogged: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //редюсеры регистер, логин, логаут
    login(state, action) {
      state.user = action.payload
      state.isLogged = true
    },
  },
}) //передаем объект с опциями

export const { login } = authSlice.actions

export default authSlice.reducer
