import { Navigate } from "react-router-dom";
import { useUserState } from "../components/Hooks/UseUser";
import { useGetReviewsQuery } from "../features/reviewApiSlice";
import { Spinner } from "flowbite-react";
import { Review } from "../types/Review";
import UserReviewList from "../components/Review/UserReviewList";

export default function ProfilePage() {
    const [user] = useUserState();

    const {
        data: reviews,
        isLoading,
        isError,
        error,
    } = useGetReviewsQuery({
        user_id: user?.id,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <p>{error?.data?.message}</p>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>{user?.display_name}</h1>
            <img src={user?.image} alt={user?.display_name} />
            <UserReviewList reviews={reviews as Review[]} />
        </div>
    );
}
