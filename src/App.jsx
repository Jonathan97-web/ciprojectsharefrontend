import "./App.css";
import { useLoggedInUser } from "./context/LoggedInUserContext";
import ProjectCard from "./components/ProjectCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import { useLocation } from "react-router-dom";

function App() {
  const loggedInUser = useLoggedInUser();
  const [projects, setProjects] = useState([]);
  const location = useLocation();

  const fetchProjects = async () => {
    const data = await axios.get("http://localhost:8000/projects/");
    setProjects(data.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
