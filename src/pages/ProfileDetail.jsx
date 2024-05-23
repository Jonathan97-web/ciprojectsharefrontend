import { useParams } from "react-router-dom";
import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileDetail() {
  const loggedInUser = useLoggedInUser();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const { id } = useParams();
  const getProfile = async () => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.get(`http://localhost:8000/profiles/${id}`);
      setProfile(response?.data);
      setFirstName(response?.data?.first_name || "");
      setLastName(response?.data?.last_name || "");
    } catch (err) {
      setError(err.response.status);
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedInUser?.pk == id) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/profiles/${id}/`,
          {
            first_name: firstName,
            last_name: lastName,
          }
        );
        console.log(response?.data);
        setEdit(false);
        getProfile();
      } catch (err) {
        console.log(err);
      }
    } else {
      return <div>Not authorized</div>;
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getProfile();
  }, [id]);

  if (error === 404) {
    return <div>Profile not found</div>;
  } else if (error === 401) {
    return <div>You are not authorized, not logged in</div>;
  }

  return (
    <>
      {!edit ? (
        <>
          <div className="flex flex-col">
            <h2>Name</h2>
            <p>
              {profile?.first_name} {profile?.last_name}
            </p>
            <h2>Email</h2>
            <p> {profile?.email}</p>
          </div>
          <br />
          {loggedInUser?.pk == id && (
            <>
              <button onClick={() => setEdit(true)}>edit</button>
            </>
          )}
        </>
      ) : (
        <>
          <div>Hello</div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              placeholder={profile?.first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              placeholder={profile?.last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
