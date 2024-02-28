import NavbarItem from "./NavbarItem";

type AuthenticationButtonProps = {
    token: string;
    AUTH_URL: string;
    logout: () => void;
};

export default function AuthenticationButton({
    token,
    AUTH_URL,
    logout,
}: AuthenticationButtonProps) {
    return (
        <NavbarItem>
            {!token ? (
                <a href={AUTH_URL}>Login to Spotify</a>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
        </NavbarItem>
    );
}
