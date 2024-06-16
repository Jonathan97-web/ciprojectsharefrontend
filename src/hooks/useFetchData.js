import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/axios";

export default function useFetchData() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developer, setDeveloper] = useState(null);

  const fetchProject = async () => {
    try {
      if (id) {
        const { data } = await instance.get(`/projects/${id}`);
        const { developer } = await instance.get(`/users/?populate=*`);
        setDeveloper(developer?.data);
        setProject(data);
      }
      const projectList = await instance.get(`/projects?populate=*`);
      setProjects(projectList?.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(projects);
  console.log(developer);

  useEffect(() => {
    fetchProject();
  }, [id]);

  return { project, developer, projects };
}
