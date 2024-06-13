import { Link } from "react-router-dom";

export default function ProjectCard({ project, username }) {
  return (
    <>
      <div className="card">
        <div className="card-header border-2 border-white">
          <h2>
            <Link to={`/profile/${project.developer}`}>{username}</Link>
          </h2>
        </div>
        <div className="card-body border-2 border-white">
          <h5 className="card-title">
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </h5>
          <p className="card-text">Description: {project.description}</p>
          <p className="card-text">{project.developer}</p>
          <div className="card-footer border-2 border-white">
            <p className="card-text">
              <Link to={project.homepage} target="_blank">{project.homepage}</Link>
            </p>
            <p className="card-text">
              <Link to={project.repo} target="_blank">{project.repo}</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
