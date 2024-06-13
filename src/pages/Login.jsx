import { useState } from "react";
import {
  useSetLoggedInUser,
  useLoggedInUser,
} from "../context/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";

export default function Login() {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data}  = await instance.post(
        "/auth/local/",
        {
          identifier: username,
          password: password,
        }
      );
      localStorage.setItem("token", data.jwt);
      setLoggedInUser(data.user);
      console.log(data)
      navigate("/");
    } catch (err) {
      console.log(err);
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
        <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
          {error?.non_field_errors}
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          {error?.password}
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
