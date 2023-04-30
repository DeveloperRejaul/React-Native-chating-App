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
    // get all lest message
    getAllLastMessage: builder.query({
      query: (userId) => ({
        url: `/message/lastMessage/${userId}`,
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

    // create chat message
    createChatMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useLoginUserMutation,
  useCreateRoomMutation,
  useCreateChatMessageMutation,
  useGetAllLastMessageQuery,
} = chatApi;
