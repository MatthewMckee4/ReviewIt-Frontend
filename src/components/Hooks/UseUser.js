import React, { createContext, useState, useContext, useEffect } from "react";
import { useCreateUserMutation } from "../../features/userApiSlice";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  const [createUser] = useCreateUserMutation();

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const updateUser = async (newUserInfo) => {
    console.log("Updating user:", newUserInfo);
    const display_name = newUserInfo.display_name;
    let userPayload = { ...newUserInfo, name: display_name };

    if (newUserInfo.images && newUserInfo.images.length > 0) {
      const lastImage = newUserInfo.images[newUserInfo.images.length - 1].url;
      userPayload = { ...userPayload, image: lastImage };
    }

    setUser(userPayload);
    if (!userPayload.id) return;
    try {
      await createUser(userPayload);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
