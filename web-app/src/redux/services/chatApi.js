import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
  }),

  endpoints: (builder) => ({
    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),

    // login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // create one by one room
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/chat",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // create one by one room
    getRoomChatMessage: builder.query({
      query: (roomId) => ({
        url: `/message/${roomId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLoginUserMutation,
  useCreateRoomMutation,
  useGetRoomChatMessageQuery,
} = chatApi;
