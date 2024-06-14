import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { updateToken, logout } from '../../modules/Auth';
import { getLocalStorageItem } from '../../utils/helpers';

const API_URL = import.meta.env.VITE_SERVER_URL;

// при каждом запросе передаем токен
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    console.log('endpoint', endpoint);

    if (endpoint !== 'refresh') {
      const access =
        getState().auth.access || JSON.parse(getLocalStorageItem('auth'))?.access || '';

      console.log('prepareHeaders', access);

      if (access) {
        headers.set('Authorization', `JWT ${access}`);
      }
    }

    return headers;
  },
});

// оболочка над базовым запросом, где в случае сбоя перезапросим access токен
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log('sending refresh token');

    const refresh = JSON.parse(getLocalStorageItem('auth'))?.refresh;

    const refreshResult = await baseQuery(
      { url: '/refresh_token/', method: 'POST', body: { refresh } },
      { ...api, endpoint: 'refresh' },
      extraOptions,
    );

    console.log('refreshResult', refreshResult);

    // если запрос прошел успешно, обновляем токен
    if (refreshResult?.data) {
      api.dispatch(updateToken({ access: refreshResult.data.access }));

      // повторяем запрос с обновленным токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 401) {
        toast.warning('Срок действия токена истек. Пожалуйста, войдите в систему еще раз');
      }

      api.dispatch(logout());
    }
  }

  return result;
};

// eslint-disable-next-line
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Tests', 'Observeds', 'User', 'Users'],
});
