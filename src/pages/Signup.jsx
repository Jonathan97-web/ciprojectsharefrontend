import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "../context/LoggedInUserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

export default function Signup() {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post(
        `/auth/local/register`,
        {
          username: username,
          password: password,
          email: email,
        }
      );
      localStorage.setItem("token", data.access);
      setLoggedInUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err.response.data.error);
      setError(err.response.data.error);
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
          <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          {error.message}
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
