import React from "react";
import { useGetReviewsQuery } from "../../features/reviewApiSlice";

const ReviewList = ({ user_id, album_id }) => {
  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery({ album_id: album_id || "", user_id: user_id || "" });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    content = (
      <div>
        <h2>Review List</h2>
        <div>
          <ul>
            {reviews.map((review) => (
              <li key={review.album_id + review.user_id}>
                User ID: {review.user_id}
                {review.rating && <span>, Rating: {review.rating}</span>}
                {review.text && <span>, Text: {review.text}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return content;
};

export default ReviewList;
