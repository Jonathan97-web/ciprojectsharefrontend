import "./App.css";
import { useLoggedInUser } from "./context/LoggedInUserContext";
import ProjectCard from "./components/ProjectCard";
import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import { useLocation } from "react-router-dom";
import instance from "./api/axios";

function App() {
  const loggedInUser = useLoggedInUser();
  const [projects, setProjects] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      const fetchProjects = async () => {
        const { data } = await instance.get("/projects?populate=*");
        setProjects(data.data);
      };
      fetchProjects();
    }
  }, [loggedInUser]);

  console.log(projects);

  return (
    <>
      {location.state?.alert && <Alert message={location.state?.alert} />}
      {!loggedInUser && (
        <>
          <h1>Welcome!</h1>
          <h2>To the Community-Sweden sharing website for Projects</h2>
        </>
      )}
      <>
        {loggedInUser && (
          <>
            <h1>Welcome {loggedInUser?.username}!</h1>
            <div>You are logged in</div>

            {projects.map((project, id) => (
              <ProjectCard key={id} project={project} />
            ))}
          </>
        )}
      </>
    </>
  );
}

export default App;
