import React, { createContext, useState, useContext, useCallback } from "react";
import { useCreateUserMutation } from "../../features/userApiSlice";
import SpotifyUser from "../User/SpotifyUser";
import { User } from "../../types/User";

interface UserContextType {
    user: User | null;
    setUser: (newUserInfo: Partial<SpotifyUser> | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUserInternal] = useState<User | null>(() => {
        const storedUser = window.localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [createUser] = useCreateUserMutation();

    const setUser = useCallback(
        async (newUserInfo: Partial<SpotifyUser> | null) => {
            if (!newUserInfo) {
                setUserInternal(null);
                window.localStorage.removeItem("user");
                return;
            }
            window.localStorage.setItem("user", JSON.stringify(newUserInfo));
            const { display_name, images, id } = newUserInfo;
            let userPayload: User = {
                display_name: display_name || "",
                image: images?.[0]?.url || "",
                id: id || "",
            };

            if (!id) return;

            try {
                await createUser(userPayload as User);
                setUserInternal(userPayload as User);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        },
        [createUser]
    );

    const contextValue: UserContextType = {
        user,
        setUser,
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export const useUserState = (): [
    User | null,
    (newUserInfo: Partial<SpotifyUser> | null) => void
] => {
    const { user, setUser } = useUser();
    return [user, setUser];
};
