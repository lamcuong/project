import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../apis/authApi'

const initialState: UserInterface = {
  name: '',
  avatar: '',
  email: '',
  username: '',
  password: ''
}

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
      state.name = payload.name || payload.username
      state.username = payload.username
      state.avatar = payload.avatar
    })
  }
})
