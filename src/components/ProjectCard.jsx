import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  const owner = project?.attributes.owner.data;
  const projectData = project?.attributes;

  return (
    <>
      <div className="card">
        <div className="card-header border-2 border-white">
          <h2>
            <Link to={`/profile/${owner.id}`}>{owner.attributes.username}</Link>
          </h2>
        </div>
        <div className="card-body border-2 border-white">
          <h5 className="card-title">
            <Link to={`/project/${project.id}`}>{projectData.title}</Link>
          </h5>
          <p className="card-text">{project.attributes.description}</p>
          <p className="card-text">{project.title}</p>
          <div className="card-footer border-2 border-white">
            <p className="card-text">
              <a href={projectData.deployedURL} target="_blank">
                {projectData.deployedURL}
              </a>
            </p>
            <p className="card-text">
              <a href={projectData.githubURL} target="_blank">
                {projectData.githubURL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
