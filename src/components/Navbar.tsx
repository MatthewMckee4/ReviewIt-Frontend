import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchMenu from "./Search/SearchMenu";
import { useUserState } from "./Hooks/UseUser";
import { useTokenState } from "./Hooks/UseToken";
import axios from "axios";
import { User } from "../types/User";

const LeftSide = () => (
    <div className="flex items-center space-x-4">
        <Link to="/" className="underline text-gray-700">
            Home
        </Link>
    </div>
);

const Center = ({ user }: { user: User }) => (
    <div className="flex items-center space-x-4">
        {user && (
            <p className="text-sm text-gray-700">
                Welcome {user.display_name}{" "}
                {user.image && (
                    <img
                        src={user.image}
                        alt="profile"
                        className="w-5 h-5 rounded-full inline-block"
                    />
                )}
            </p>
        )}
    </div>
);

const RightSide = ({
    token,
    AUTH_URL,
    logout,
}: {
    token: string;
    AUTH_URL: string;
    logout: () => void;
}) => (
    <div className="flex items-center space-x-4">
        {token ? <SearchMenu token={token} /> : null}
        <ul className="flex items-center space-x-4">
            {!token ? (
                <li>
                    <a href={AUTH_URL} className="text-sm text-blue-500">
                        Login to Spotify
                    </a>
                </li>
            ) : (
                <li>
                    <a
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                        className="text-sm text-red-500"
                    >
                        Logout
                    </a>
                </li>
            )}
        </ul>
    </div>
);

const Navbar: React.FC = () => {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID || "";
    const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || "";
    const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT || "";
    const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE || "";
    const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

    const [user, setUser] = useUserState();
    const [token, setToken] = useTokenState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchData();
    }, [token, setUser]);

    const logout = () => {
        setToken("");
        setUser({});
        navigate("/");
    };

    return (
        <nav className="flex justify-between items-center px-4 py-2 bg-gray-200">
            <LeftSide />
            {user && <Center user={user} />}
            <RightSide token={token} AUTH_URL={AUTH_URL} logout={logout} />
        </nav>
    );
};

export default Navbar;
