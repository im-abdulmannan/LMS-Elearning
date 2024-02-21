import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ name }) => ({
        url: "update-user",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-all-users",
        method: "GET",
        credentials: "include" as const,
      })
    }),
    updateUserRole: builder.mutation({
      query: ({email, role}) => ({
        url: "update-user-role",
        method: "PUT",
        body: {
          email,
          role
        },
        credentials: "include" as const,
      })
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      })
    })
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation
} = userApi;
