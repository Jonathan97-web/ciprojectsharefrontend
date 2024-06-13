import { useLoggedInUser } from "../context/LoggedInUserContext";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import useSignOut from "../hooks/useSignOut";
export default function NavBar({ toggleTheme, themeMode }) {
  const loggedInUser = useLoggedInUser();
  const navigate = useNavigate();
  const signOut = useSignOut();

  return (
    <>
      {loggedInUser ? (
        <div className="sticky pt-5 flex justify-between top-0 bg-[#] w-[80vw]">
          <h2>
            <Link to="/">#Community-Sweden</Link>
          </h2>
          <div>
            <button onClick={() => navigate("/project/add")}>
              Add Project
            </button>
            <button
              onClick={() => navigate(`/profile/projects/`)}
            >
              My Projects
            </button>
            <button onClick={() => toggleTheme()}>{themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}</button>
            <button onClick={() => navigate(`/profile/${loggedInUser?.id}`)}>
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
