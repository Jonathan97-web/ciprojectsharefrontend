import { useSetLoggedInUser } from "../context/LoggedInUserContext";

export default function useSignOut() {
  const setLoggedInUser = useSetLoggedInUser();

  const handleSignOut = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      setLoggedInUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return handleSignOut;
}
