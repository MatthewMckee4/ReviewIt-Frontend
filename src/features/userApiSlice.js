import { apiSlice } from "../app/api/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result, error, arg) => {
        return result
          ? result.map(({ id }) => ({ type: "User", id }))
          : [{ type: "User", id: "LIST" }];
      },
    }),
    getUserBySpotifyId: builder.query({
      query: (spotify_id) => `/users/${spotify_id}`,
      providesTags: (result, error, arg) => {
        return [{ type: "User", id: arg }];
      },
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ spotify_id, ...update }) => ({
        url: `/users/${spotify_id}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "User", id: arg.spotify_id }];
      },
    }),
    deleteUser: builder.mutation({
      query: (spotify_id) => ({
        url: `/users/${spotify_id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "User", id: arg }];
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserBySpotifyIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export default usersApiSlice;
