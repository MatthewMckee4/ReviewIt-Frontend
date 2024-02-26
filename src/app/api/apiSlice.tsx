import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api", // Define the name of the slice in the state
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500",
    }) as BaseQueryFn<unknown, unknown, any>,
    tagTypes: ["Review", "User"], // Define tag types as an array of strings
    endpoints: (builder) => ({}), // Define your API endpoints
});

export default apiSlice;
