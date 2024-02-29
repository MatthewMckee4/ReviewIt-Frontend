import React from "react";

type NavbarItemProps = {
    children: React.ReactNode;
    className?: string;
};

export default function NavbarItem({
    children,
    className = "",
}: NavbarItemProps) {
    return (
        <div
            className={`px-3 py-2 mx-1 transition border-b border-transparent hover:border-secondary-500 duration-300 ${className}`}
        >
            {children}
        </div>
    );
}
