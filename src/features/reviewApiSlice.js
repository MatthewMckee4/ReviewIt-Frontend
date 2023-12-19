import { apiSlice } from "../app/api/apiSlice";

const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (data) => {
        const queryParams = Object.keys(data)
          .filter((key) => data[key] !== "")
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join("&");
        const url = `/reviews?${queryParams}`;
        return {
          url: url,
          method: "GET",
        };
      },
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Review", id: "LIST" }];
      },
    }),
    createReview: builder.mutation({
      query: (newReview) => ({
        url: "/reviews",
        method: "POST",
        body: newReview,
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result) => {
        return result ? [{ type: "Review", id: result.id }] : [];
      },
    }),
    updateReview: builder.mutation({
      query: (updatedReview) => ({
        url: "/reviews",
        method: "PATCH",
        body: updatedReview,
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result) => {
        return result ? [{ type: "Review", id: result.id }] : [];
      },
    }),
    deleteReview: builder.mutation({
      query: (review) => ({
        url: "/reviews",
        method: "DELETE",
        body: review,
      }),
      transformResponse: (responseData) => {
        return responseData;
      },
      providesTags: (result) => {
        return result ? [{ type: "Review", id: result.id }] : [];
      },
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApiSlice;
