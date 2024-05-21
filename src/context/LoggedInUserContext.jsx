import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const LoggedInUserContext = createContext(null);
export const SetLoggedInUserContext = createContext(null);

export const useLoggedInUser = () => useContext(LoggedInUserContext);
export const useSetLoggedInUser = () => useContext(SetLoggedInUserContext);

export const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMount = async () => {
    try {
      let token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await axios.get(
          "http://localhost:8000/dj-rest-auth/user/"
        );
        setLoggedInUser(data);
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
