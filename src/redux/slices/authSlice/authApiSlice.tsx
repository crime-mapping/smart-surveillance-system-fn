import { apiSlice } from "../apiSlice";
const BASE_URL = "/auth"; 

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginByGoogle: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/login/google`, 
                method: 'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        loginTwoFa: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/factor`,
                method: 'POST',
                body: data
            })
        }),
        registerByGoogle: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/register/google`, 
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${BASE_URL}/logout`,
                method: 'POST'
            })
        }),
        userRegister: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/register`,
                method: "POST",
                body: data,
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/update`,
                method: 'PATCH',
                body: data
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: `${BASE_URL}/changepassword`,
                method: 'PATCH',
                body: data
            })
        })
    })
});

export const {
    useLoginByGoogleMutation,
    useLoginMutation,
    useLogoutMutation,
    useUserRegisterMutation,
    useRegisterByGoogleMutation,
    useLoginTwoFaMutation,
    useUpdateUserMutation,
    useChangePasswordMutation
} = userApiSlice;