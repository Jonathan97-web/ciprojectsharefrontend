import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "../context/LoggedInUserContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/dj-rest-auth/registration/",
        {
          username: username,
          password1: password,
          password2: password,
        }
      );
      localStorage.setItem("token", data.access);
      setLoggedInUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };

  if (error?.detail == "User not found") {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
  }

  return (
    <>
      {!loggedInUser ? (
        <form onSubmit={handleSubmit}>
          <h2>Sign Up!</h2>
          {error && (
            <p>
              <br /> {error.username} <br /> {error.password1}
              <br />
            </p>
          )}
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <h1>You are already signed in!</h1>
          <button>Home</button>
        </>
      )}
    </>
  );
}
