import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchMenu from "./Search/SearchMenu";
import { useUserState } from "./Hooks/UseUser";
import { useTokenState } from "./Hooks/UseToken";
import { User } from "../types/User";
import GetUserData from "../api/GetUserData";

export default function Navbar() {
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
            const user = await GetUserData(token);
            setUser(user);
        };
        fetchData();
    }, [token, setUser]);

    const logout = () => {
        setToken("");
        setUser(null);
        navigate("/");
        window.location.reload();
    };

    return (
        <nav className="flex justify-between items-center h-16 px-4 py-2">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-700">
                    Home
                </Link>
            </div>

            <AuthControls
                user={user}
                token={token}
                AUTH_URL={AUTH_URL}
                logout={logout}
            />
        </nav>
    );
}

type AuthControlsProps = {
    user: User | null;
    token: string;
    AUTH_URL: string;
    logout: () => void;
};

function AuthControls({ user, token, AUTH_URL, logout }: AuthControlsProps) {
    return (
        <div className="flex items-center">
            {user && <UserProfile user={user} />}
            {token ? <SearchMenu /> : null}
            <AuthButton token={token} AUTH_URL={AUTH_URL} logout={logout} />
        </div>
    );
}

function UserProfile({ user }: { user: User }) {
    return (
        <div className="">
            <p className="text-sm mr-2">
                Profile
                {user.image && (
                    <img
                        src={user.image}
                        alt="profile"
                        className="w-5 h-5 rounded-full inline-block"
                    />
                )}
            </p>
        </div>
    );
}

type AuthButtonProps = {
    token: string;
    AUTH_URL: string;
    logout: () => void;
};

function AuthButton({ token, AUTH_URL, logout }: AuthButtonProps) {
    return (
        <>
            {!token ? (
                <a href={AUTH_URL} className="border border-gray-300 px-2 py-1">
                    Login to Spotify
                </a>
            ) : (
                <button
                    onClick={logout}
                    className="border border-gray-300 px-2 py-1"
                >
                    Logout
                </button>
            )}
        </>
    );
}
