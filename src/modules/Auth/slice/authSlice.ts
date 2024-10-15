import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  access: null,
  refresh: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { access, refresh } = action.payload;

      state.access = access;
      state.refresh = refresh;
    },
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
    setUserCredentials: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.access = action.payload.access;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setToken, logout, setUserCredentials, updateToken } = actions;
export default reducer;
