import { Review } from "../../types/Review";

type ReviewCardProps = {
    review: Review;
};

export default function AlbumReviewCard({ review }: ReviewCardProps) {
    return (
        <li>
            <div>
                {review.user.image && (
                    <img src={review.user.image} alt="User" />
                )}
                <p>{review.text}</p>
            </div>
            <div>{review.rating && <span>{review.rating}</span>}</div>
        </li>
    );
}
