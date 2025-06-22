import { api } from "./index";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginAdmin: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    registerAdmin: build.mutation({
      query: (body) => ({
        url: "/auth/admin/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    getProfile: build.query({
      query: () => ({
        url: "/user/me",
      }),
      providesTags: ["Admin"],
    }),
    editProfile: build.mutation({
      query: (body) => ({
        url: "/user/me",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
    resetPassword: build.mutation({
      query: ({ id, newPassword }) => ({
        url: `/user/me/reset-password`,
        method: "PATCH",
        body: { id, newPassword },
      }),
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    getSingleAdmin: build.query({
      query: (id) => `admin/${id}`,
    }),
    editAdmin: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useGetProfileQuery,
  useEditProfileMutation,
  useResetPasswordMutation,
  useDeleteAdminMutation,
  useGetSingleAdminQuery,
  useEditAdminMutation,
} = adminApi;
