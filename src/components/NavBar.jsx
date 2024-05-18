import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import "../index.css";
import useSignOut from "../hooks/useSignOut";
export default function NavBar() {
  const loggedInUser = useLoggedInUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  return (
    <>
      {loggedInUser ? (
        <div className="sticky flex justify-between top-0 navbar">
          <h2>
            <a href="/">#Community-Sweden</a>
          </h2>
          <div>
            <button onClick={() => navigate(`/profile/${loggedInUser?.pk}`)}>
              {loggedInUser?.username} | Profile
            </button>
            <button onClick={signOut}>Logout</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="sticky flex justify-between top-0 navbar">
            <h2>
              <a href="/">#Community-Sweden</a>
            </h2>
            <div>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
