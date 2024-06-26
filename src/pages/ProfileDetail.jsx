import { useParams } from "react-router-dom";
import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useEffect, useState } from "react";
import instance from "../api/axios";

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
      const response = await instance.get(`/users/${id}`);
      setProfile(response?.data);
      setFirstName(response?.data?.firstName || "");
      setLastName(response?.data?.lastName || "");
    } catch (err) {
      setError(err.response.status);
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loggedInUser?.id == id) {
      try {
        const response = await instance.put(
          `/users/${id}/`,
          {
            firstName: firstName,
            lastName: lastName,
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
              {profile?.firstName} {profile?.lastName}
            </p>
            <h2>Email</h2>
            <p> {profile?.email}</p>
          </div>
          <br />
          {loggedInUser?.id == id && (
            <>
              <button onClick={() => setEdit(true)}>edit</button>
            </>
          )}
        </>
      ) : (
        <>
          <div>Hello</div>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="fName">First Name</label>
            <input
              id="fName"
              type="text"
              placeholder={profile?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lName">Last Name</label>
            <input
              id="lName"
              type="text"
              placeholder={profile?.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </>
  );
}
