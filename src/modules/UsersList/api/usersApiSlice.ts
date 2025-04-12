import { apiSlice } from '@app/api/apiSlice';

const usersApiSlice = apiSlice.injectEndpoints?.({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: '/users/register_user/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users', 'ObservedsTutor'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/delete_user/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users', 'ObservedsTutor'],
    }),
  }),
});

// eslint-disable-next-line
export const { useAddUserMutation, useDeleteUserMutation } = usersApiSlice;
