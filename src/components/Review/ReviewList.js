import React from "react";
import { useGetReviewsQuery } from "../../features/reviewApiSlice";

const ReviewList = ({ user_id, album_id }) => {
    const {
        data: reviews,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetReviewsQuery({
        album_id: album_id || "",
        user_id: user_id || "",
    });

    let content;

    if (isLoading) {
        content = <p style={{ width: "100%" }}>Loading...</p>;
    }

    if (isError) {
        content = (
            <p style={{ width: "100%" }} className="errmsg">
                {error?.data?.message}
            </p>
        );
    }

    if (isSuccess) {
        content = (
            <div style={{ width: "100%" }}>
                <h2>Reviews</h2>
                <ul
                    style={{ listStyleType: "none", padding: 0, width: "100%" }}
                >
                    {reviews.map((review) => (
                        <li
                            key={review.album_id + review.user_id}
                            style={reviewItemStyle}
                        >
                            <div style={leftContentStyle}>
                                {review.user.image && (
                                    <img
                                        src={review.user.image}
                                        alt="User"
                                        style={imageStyle}
                                    />
                                )}
                                <p style={{ marginLeft: "10px" }}>
                                    {review.text}
                                </p>
                            </div>
                            <div style={ratingStyle}>
                                {review.rating && <span>{review.rating}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return content;
};

const reviewItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "8px",
    margin: "10px 0",
};

const leftContentStyle = {
    display: "flex",
    alignItems: "center",
    flex: 1,
};

const imageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
};

const ratingStyle = {
    flexShrink: 0,
    marginLeft: "20px",
};

export default ReviewList;
