import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useEffect, useState } from "react";
export default function NavBar() {
  const [loading, setLoading] = useState(false);
  const loggedInUser = useLoggedInUser();

  useEffect(() => {
    if (!loggedInUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loggedInUser]);

  if (loading) {
    return;
  }

  return (
    <>
      <div>
        <h1>Welcome! {loggedInUser?.username} </h1>
      </div>
    </>
  );
}
