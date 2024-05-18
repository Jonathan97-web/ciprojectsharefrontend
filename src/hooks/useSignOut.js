import { useSetLoggedInUser } from "../context/LoggedInUserContext";
import axios from "axios";

export default function useSignOut() {
  const setLoggedInUser = useSetLoggedInUser();

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:8000/dj-rest-auth/logout/");
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      setLoggedInUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return handleSignOut;
}
