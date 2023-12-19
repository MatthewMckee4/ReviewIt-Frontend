import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user")) || null;
  });

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const updateUser = (newUserInfo) => {
    const display_name = newUserInfo.display_name;

    if (newUserInfo.images && newUserInfo.images.length > 0) {
      const lastImage = newUserInfo.images[newUserInfo.images.length - 1];

      setUser({ ...newUserInfo, image: lastImage, name: display_name });
    } else {
      setUser({ ...newUserInfo, name: display_name });
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
