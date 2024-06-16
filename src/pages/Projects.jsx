import useFetchData from "../hooks/useFetchData";
import ProjectCard from "../components/ProjectCard";
import { useLoggedInUser } from "../context/LoggedInUserContext";

export default function Projects() {
  const loggedInUser = useLoggedInUser();
  const { projects, developer } = useFetchData();

  const checkIfUserIsDeveloper = (project) => {
    return project.developer === loggedInUser?.id;
  };

  console.log(projects);

  console.log(loggedInUser);
  return (
    <>
      {projects.filter(checkIfUserIsDeveloper).map((project, id) => (
        <ProjectCard
          key={id}
          project={project}
          username={developer?.username}
        />
      ))}
    </>
  );
}
