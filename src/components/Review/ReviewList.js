import React, { useState } from "react";
import { useGetReviewsQuery } from "../../features/reviewApiSlice";

const ReviewList = ({ user_id, album_id }) => {
  const [userId, setUserId] = useState(user_id || "");
  const [currentAlbumId, setCurrentAlbumId] = useState(album_id || "");
  const {
    data: reviews,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery({ user_id: userId, album_id: currentAlbumId });

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
                User ID: {review.user_id}, Album ID: {review.album_id}, Rating:{" "}
                {review.rating}, Text: {review.text}
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
