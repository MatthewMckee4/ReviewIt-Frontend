import React, { useEffect, useState } from "react";
import {
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsQuery,
} from "../../features/reviewApiSlice";

export const ReviewBox = ({ user_id, album_id }) => {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(null);

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
        console.log(input);
        const parsedRating = parseFloat(input);
        console.log(parsedRating);

        if (
            !isNaN(parsedRating) &&
            parsedRating >= 0 &&
            parsedRating <= 10 &&
            input.length <= 4
        ) {
            if (parsedRating === 10) {
                setRating(parsedRating);
            } else {
                setRating(input);
            }
        } else if (input === "") {
            setRating(null);
        }
    };

    const handleSubmit = async () => {
        try {
            if (review) {
                const payload = {
                    user_id,
                    album_id,
                    text,
                    rating: parseFloat(rating) || null,
                };
                if (text || rating) {
                    console.log("updating review");
                    console.log(payload);
                    await updateReview(payload);
                } else {
                    await deleteReview({ user_id, album_id });
                }
            } else {
                if (text || rating) {
                    let payload = { user_id, album_id };
                    if (text) payload.text = text;
                    if (rating) payload.rating = parseFloat(rating) || null;
                    await addReview(payload);
                }
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="review-box">
            <textarea
                placeholder="Review"
                value={text}
                onChange={handleTextChange}
            />
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Rating (0-10)"
                    value={rating !== null ? rating.toString() : ""}
                    onChange={handleRatingChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};
