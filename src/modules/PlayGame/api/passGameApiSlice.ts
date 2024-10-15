import { apiSlice } from '../../../app/api/apiSlice';

// TODO: нужен URL
const passGameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    passGame: builder.mutation({
      query: (data) => ({
        url: 'нужен URL',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ObservedGames'],
    }),
  }),
});

// eslint-disable-next-line
export const { usePassGameMutation } = passGameApiSlice;
