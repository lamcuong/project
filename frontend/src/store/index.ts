import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { accountApi } from './apis/accountApi'
import { authApi } from './apis/authApi'
import { userSlice } from './slices/user'
import { expenseApi } from './apis/expenseApi'
export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(accountApi.middleware, authApi.middleware, expenseApi.middleware)
    // .concat(authApi.middleware)
    // .concat(expenseApi.middleware);
  }
})
setupListeners(store.dispatch)
// export { useFetchAccountQuery } from './apis/accountApi';
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
