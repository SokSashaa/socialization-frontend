import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { user_dto } from '@dto/user.dto';

type initialStateType = {
    user: user_dto | null;
    access: null | string;
    refresh: null | string;
};

type tokensType = Omit<initialStateType, 'user'>;

const initialState: initialStateType = {
    user: null,
    access: null,
    refresh: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<tokensType>) => {
            const { access, refresh } = action.payload;

            state.access = access;
            state.refresh = refresh;
        },
        logout: (state) => {
            state.user = null;
            state.access = null;
            state.refresh = null;
        },
        setUserCredentials: (state, action: PayloadAction<user_dto>) => {
            state.user = action.payload;
        },
        updateToken: (state, action: PayloadAction<{ access: string }>) => {
            state.access = action.payload.access;
        },
    },
});

const { reducer, actions } = authSlice;

export const { setToken, logout, setUserCredentials, updateToken } = actions;
export default reducer;
