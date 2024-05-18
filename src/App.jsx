import "./App.css";
import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "./context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const setLoggedInUser = useSetLoggedInUser();
  const loggedInUser = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loggedInUser]);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {!loggedInUser ? (
        <>
          <h1>Welcome!</h1>
          <h2>To the Community-Sweden sharing website for Projects</h2>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </>
      ) : (
        <>
          <h1>
            Welcome {loggedInUser.username ? loggedInUser.username : "Guest"}!
          </h1>
          <div>You are logged in</div>
          <button onClick={handleSignOut}>Logout</button>
        </>
      )}
    </>
  );
}

export default App;
