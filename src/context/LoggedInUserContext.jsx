import { createContext, useContext, useEffect, useState } from "react";
import instance from "../api/axios";
export const LoggedInUserContext = createContext(null);
export const SetLoggedInUserContext = createContext(null);

export const useLoggedInUser = () => useContext(LoggedInUserContext);
export const useSetLoggedInUser = () => useContext(SetLoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMount = async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      console.log(jwt)
      if (jwt) {
        const response = await instance.get(
          "/users/me",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setLoggedInUser(response.data);
        console.log(response)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  if (loading) {
    return <div></div>;
  }
  return (
    <LoggedInUserContext.Provider value={loggedInUser}>
      <SetLoggedInUserContext.Provider value={setLoggedInUser}>
        {children}
      </SetLoggedInUserContext.Provider>
    </LoggedInUserContext.Provider>
  );
};
