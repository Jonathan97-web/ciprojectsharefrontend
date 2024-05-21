import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoggedInUser } from "../context/LoggedInUserContext";
import useFetchData from "./useFetchData";
export default function useProject() {
  const [editProject, setEditProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [deleteProject, setDeleteProject] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loggedInUser = useLoggedInUser();
  const { id } = useParams();
  const { project } = useFetchData();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    homepage: "",
    repo: "",
    developer: loggedInUser?.pk,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormData({
          title: project?.title || "",
          description: project.description || "",
          homepage: project.homepage || "",
          repo: project.repo || "",
          developer: loggedInUser?.pk,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [
    id,
    loggedInUser,
    project.title,
    project.homepage,
    project.repo,
    project.description,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (addProject) {
        const response = await axios.post(
          "http://localhost:8000/projects/",
          formData
        );
        if (response.status === 201) {
          navigate("/", {
            state: { alert: "Succesfully created the project!!" },
          });
        }
      }
      if (deleteProject) {
        axios.delete(`http://localhost:8000/projects/${id}`);
        navigate("/", {
          state: { alert: "Successfully deleted the project!" },
        });
      }
      if (editProject) {
        axios.patch(`http://localhost:8000/projects/${id}/`, formData);
        navigate("/", { state: { alert: "Successfully edited the Project" } });
      }
    } catch (err) {
      setError(err.response.data);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return {
    error,
    addProject,
    deleteProject,
    editProject,
    formData,
    handleSubmit,
    handleChange,
    setEditProject,
    setAddProject,
    setDeleteProject,
    id,
  };
}
