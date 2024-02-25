import React, { createContext, useContext, useState, useEffect } from "react";

interface TokenContextType {
    token: string;
    setToken: (token: string) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [token, setTokenInternal] = useState<string>(() => {
        return window.localStorage.getItem("token") || "";
    });

    const setToken = (newToken: string) => {
        window.localStorage.setItem("token", newToken || "");
        setTokenInternal(newToken);
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            window.localStorage.removeItem("token");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const contextValue: TokenContextType = {
        token,
        setToken,
    };

    return (
        <TokenContext.Provider value={contextValue}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
};

export const useTokenState = (): [string, (token: string) => void] => {
    const { token, setToken } = useToken();
    return [token, setToken];
};
