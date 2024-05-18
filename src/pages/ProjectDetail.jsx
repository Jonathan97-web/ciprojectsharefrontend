import { useParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/projects/${id}`);
      console.log(data);
      setProject(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(project);

  useEffect(() => {
    fetchProject();
  }, [id]);

  return <ProjectCard project={project} />;
}
