import { Link } from "react-router-dom";
import { User } from "../../types/User";
import NavbarItem from "./NavbarItem";

export default function ProfileLink({ user }: { user: User }) {
    return (
        <Link to="/profile">
            <NavbarItem>Profile</NavbarItem>
        </Link>
    );
}
