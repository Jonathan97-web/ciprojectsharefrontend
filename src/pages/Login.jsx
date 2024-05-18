import { useState } from "react";
import {
  useSetLoggedInUser,
  useLoggedInUser,
} from "../context/LoggedInUserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/dj-rest-auth/login/",
        {
          username: username,
          password: password,
        }
      );
      console.log(data);
      localStorage.setItem("token", data.access);
      localStorage.setItem("refresh", data.refresh);
      setLoggedInUser(data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!loggedInUser ? (
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <>
          <div>You are already logged in</div>
          <button>Home</button>
        </>
      )}
    </>
  );
}
