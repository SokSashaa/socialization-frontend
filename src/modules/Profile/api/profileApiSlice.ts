import { apiSlice } from '../../../app/api/apiSlice';

const profileApiSlice = apiSlice.injectEndpoints?.({
  endpoints: (builder) => ({
    changeUserInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/change_user_info/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User', 'Users'],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/users/change_password/',
        method: 'POST',
        body: data,
      }),
    }),
    changePasswordAdmin: builder.mutation({
      query: ({id,data})=>({
        url: `/users/${id}/change_password_user/`,
        method: 'POST',
        body: data,
      })
    })
  }),
});

export const { useChangeUserInfoMutation, useChangePasswordMutation, useChangePasswordAdminMutation } = profileApiSlice;
