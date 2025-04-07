import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setToken, updateToken, logout, setUserCredentials } from './authSlice';
import { getLocalStorageItem } from '@utils/helpers';

const loginListener = createListenerMiddleware();

/**
+   * A function that handles the side effects based on the action type.
+   *
+   * @param {Object} action - The action object triggering the effect.
+   * @param {Object} listenerApi - The listener API object for accessing the current state.
+   * @return {void} This function does not return anything.
+   */
loginListener.startListening({
  matcher: isAnyOf(setToken, updateToken, logout, setUserCredentials),
  effect: (action, listenerApi) => {
    const { type } = action;
    const state = listenerApi.getState();

    switch (type) {
      case setToken.type: {
        writeStorage('auth', JSON.stringify({ ...state.auth }));
        break;
      }
      case updateToken.type: {
        const auth = getLocalStorageItem('auth');

        writeStorage('auth', JSON.stringify({ ...JSON.parse(auth), access: state.auth.access }));
        break;
      }
      case setUserCredentials.type: {
        const auth = getLocalStorageItem('auth');

        writeStorage('auth', JSON.stringify({ ...JSON.parse(auth), user: state.auth.user }));
        break;
      }
      case logout.type: {
        deleteFromStorage('auth');
        break;
      }
      default:
        break;
    }
  },
});

// eslint-disable-next-line
export { loginListener };
