import { apiSlice } from '@app/api/apiSlice';

const editTestApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editTest: builder.mutation({
            query: (test) => ({
                url: `/tests/${test.id}/create_questions/`,
                method: 'POST',
                body: test,
            }),
            invalidatesTags: ['Tests'],
        }),
    }),
});

// eslint-disable-next-line
export const { useEditTestMutation } = editTestApiSlice;
