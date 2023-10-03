import React, { useEffect, useState } from "react";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "../../features/reviewApiSlice";

const NUMBER_REGEX = /^(100|\d{1,2})$/;

export const ReviewBox = ({ user_id, album_id }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [validRating, setValidRating] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [
    addReview,
    { isCreateLoading, isCreateSuccess, isCreateError, createError },
  ] = useCreateReviewMutation();

  const {
    data: review,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetReviewsQuery({ user_id: user_id, album_id: album_id });

  console.log("review", review);
  useEffect(() => {
    if (review && !dataLoaded) {
      console.log(rating);
      setRating(review[0].rating);
      console.log(rating);
      setText(review[0].text);
      setDataLoaded(true);
    }
  }, [review, dataLoaded]);

  useEffect(() => {
    setValidRating(NUMBER_REGEX.test(rating));
  }, [rating]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleRatingChange = (event) => {
    const input = event.target.value.slice(0, 3);
    setRating(input || "");
  };

  const canSave = validRating;

  const handleSubmit = async (e) => {
    if (review) {
      if (text || rating) {
        // update
      } else {
        // delete
      }
    } else {
      if (text || rating) {
        e.preventDefault();
        if (canSave) {
          await addReview({
            user_id: user_id,
            album_id: album_id,
            text: text,
            rating: rating,
          });
        }
      } else {
        // do nothing
      }
    }
  };

  return (
    <div className="review-box">
      <textarea placeholder="Review" value={text} onChange={handleTextChange} />
      <div className="input-group">
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={handleRatingChange}
          min="0"
          max="999"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
