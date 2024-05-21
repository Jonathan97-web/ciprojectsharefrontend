import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useFetchData() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developer, setDeveloper] = useState(null);

  const fetchProject = async () => {
    try {
      if (id) {
        const { data } = await axios.get(
          `http://localhost:8000/projects/${id}`
        );
        const developer = await axios.get(
          `http://localhost:8000/users/${data?.developer}`
        );
        setDeveloper(developer?.data);
        setProject(data);
      }
      const projectList = await axios.get(`http://localhost:8000/projects/`);
      setProjects(projectList?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  return { project, developer, projects };
}
