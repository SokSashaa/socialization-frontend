import {toast} from 'react-toastify';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {logout, updateToken} from '@modules/Auth';

import {getLocalStorageItem} from '@utils/helpers';
import {clearAllCookies} from '@utils/helpers/clearCookie';
import {getCSRFTokenFromCookies} from '@utils/helpers/getCSRFTokenFromCookies';

const API_URL = import.meta.env.VITE_SERVER_URL;

// при каждом запросе передаем токен
const baseQuery = fetchBaseQuery({
	baseUrl: API_URL,
	credentials: 'include',
	prepareHeaders: (headers, {getState, endpoint}) => {
		if (endpoint !== 'refresh') {
			const access =
				getState().auth.access || JSON.parse(getLocalStorageItem('auth'))?.access || '';

			if (access) {
				headers.set('Authorization', ` Bearer ${access}`);
			}

			const csrfToken = getCSRFTokenFromCookies(); // Функция для извлечения CSRF из кук
			if (csrfToken) {
				headers.set('X-CSRFToken', csrfToken);
			}
		}

		return headers;
	},
});

// оболочка над базовым запросом, где в случае сбоя перезапросим access токен
const baseQueryWithReauth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.status === 401 || result?.error?.status === 403) {
		const refresh = JSON.parse(getLocalStorageItem('auth'))?.refresh;

		const refreshResult = await baseQuery(
			{url: '/refresh_token/', method: 'POST', body: {refresh}},
			{...api, endpoint: 'refresh'},
			extraOptions
		);

		// если запрос прошел успешно, обновляем токен
		if (refreshResult?.data) {
			api.dispatch(updateToken({access: refreshResult.data.access}));

			// повторяем запрос с обновленным токеном
			result = await baseQuery(args, api, extraOptions);
		} else {
			if (refreshResult?.error?.status === 401) {
				toast.warning('Срок действия токена истек. Пожалуйста, войдите в систему еще раз');
			}
			// Отправляем запрос на logout endpoint
			await baseQuery(
				{
					url: '/users/logout/',
					method: 'POST',
				},
				api,
				extraOptions
			);

			clearAllCookies();
			api.dispatch(logout());
		}
	}

	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: [
		'Tests',
		'Observeds',
		'User',
		'ObservedTests',
		'Users',
		'ObservedsTutor',
		'ObservedGames',
		'Organizations',
		'Games',
	],
});
