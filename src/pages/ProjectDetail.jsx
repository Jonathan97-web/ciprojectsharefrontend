import useFetchData from "../hooks/useFetchData";
import useProject from "../hooks/useProject.jsx";
import ProjectCard from "../components/ProjectCard";
import { useLoggedInUser } from "../context/LoggedInUserContext";
import { useEffect } from "react";

export default function ProjectDetail() {
  const loggedInUser = useLoggedInUser();
  const { project, developer } = useFetchData();
  const {
    handleSubmit,
    setDeleteProject,
    setEditProject,
    editProject,
    error,
    title,
    description,
    homepage,
    repo,
    handleChange,
  } = useProject();

  useEffect(() => {
    if (!editProject) {
      setDeleteProject(true);
    } else {
      setDeleteProject(false);
    }
  }, [editProject, setDeleteProject]);

  return (
    <>
      {!editProject ? (
        <>
          <ProjectCard project={project} username={developer?.username} />
          {loggedInUser.pk === project.developer && (
            <div className="flex gap-3 justify-center">
              <button className="btn-red" onClick={handleSubmit}>
                Delete
              </button>
              <button
                className="btn bg-blue-600"
                onClick={() => setEditProject(true)}
              >
                Edit
              </button>
            </div>
          )}
        </>
      ) : (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start">
            Title {error && <p>{error.title}</p>}
          </div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder={project.title}
          />
          <div className="flex flex-col items-start">
            Description {error && <p>{error.description}</p>}
          </div>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder={project.description}
          />
          <div className="flex">
            <p>Homepage</p>
          </div>
          <input
            type="text"
            name="homepage"
            value={homepage}
            onChange={handleChange}
            placeholder={project.homepage}
          />
          <div className="flex flex-col items-start">
            Repo {error && <p>{error.repo}</p>}
          </div>
          <input
            type="text"
            name="repo"
            value={repo}
            onChange={handleChange}
            placeholder={project.repo}
          />
          <button className="btn bg-green-500" type="submit">
            Submit
          </button>
          <button className="bg-blue-600" onClick={() => setEditProject(false)}>
            Cancel
          </button>
        </form>
      )}
    </>
  );
}
