import { useEffect } from "react";
import useProject from "../../hooks/useProject";

export default function AddProject() {
  const {
    error,
    setAddProject,
    handleSubmit,
    githubURL,
    deployedURL,
    title,
    description,
    handleChange,
  } = useProject();

  useEffect(() => {
    setAddProject(true);
  });

  return (
    <>
      <form className="flex flex-col  gap-5" onSubmit={handleSubmit}>
        <div className="flex flex-col items-start">
          Title {error && <p>{error.title}</p>}
        </div>
        <input type="text" name="title" value={title} onChange={handleChange} />
        <div className="flex flex-col items-start">
          Description {error && <p>{error.description}</p>}
        </div>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <div className="flex">
          <p>Homepage</p>
        </div>
        <input
          type="text"
          name="homepage"
          value={deployedURL}
          onChange={handleChange}
        />
        <div className="flex flex-col items-start">
          Repo {error && <p>{error.repo}</p>}
        </div>
        <input type="text" name="repo" value={githubURL} onChange={handleChange} />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
