import React, { useEffect, useState } from "react";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../features/reviewApiSlice";

const NUMBER_REGEX = /^[0-9]*\.?[0-9]{0,2}$/;

export const ReviewBox = ({ user_id, album_id }) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");
  const [validRating, setValidRating] = useState(true);

  const [addReview] = useCreateReviewMutation();
  const { data: review } = useGetReviewsQuery({ user_id, album_id });
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  useEffect(() => {
    if (review && review.length > 0) {
      setRating(review[0].rating ? review[0].rating.toString() : "");
      setText(review[0].text || "");
    }
  }, [review]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleRatingChange = (event) => {
    const input = event.target.value;
    if (input === "" || (NUMBER_REGEX.test(input) && parseFloat(input) <= 10)) {
      setRating(input);
      setValidRating(NUMBER_REGEX.test(input));
    }
  };

  const handleSubmit = async () => {
    if (!validRating) return;

    if (review) {
      const payload = {
        user_id,
        album_id,
        text,
        rating: parseFloat(rating) || "",
      };
      if (text || rating) {
        await updateReview(payload);
      } else {
        await deleteReview({ user_id, album_id });
      }
    } else {
      if (text || rating) {
        let payload = { user_id, album_id };
        if (text) payload.text = text;
        if (rating) payload.rating = parseFloat(rating);
        await addReview(payload);
      }
    }
    try {
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="review-box">
      <textarea placeholder="Review" value={text} onChange={handleTextChange} />
      <div className="input-group">
        <input
          type="text"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={handleRatingChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};
