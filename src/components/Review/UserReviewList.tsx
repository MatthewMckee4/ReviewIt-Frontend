// UserReviewList.tsx
import { Review } from "../../types/Review";
import UserReviewCard from "./UserReviewCard";

type UserReviewListProps = {
    reviews: Review[];
};

export default function UserReviewList({ reviews }: UserReviewListProps) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {reviews.map((review: Review) => (
                <UserReviewCard
                    review={review}
                    key={review.album_id + review.user_id}
                />
            ))}
        </div>
    );
}
