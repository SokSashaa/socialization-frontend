import {RootState} from '@app/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentToken = (state: RootState) => state.auth.access;
