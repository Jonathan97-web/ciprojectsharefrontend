export default function ProjectCard({ project }) {
  return (
    <>
      <div className="card">
        <div className="card-body border-2 border-white">
          <h5 className="card-title">
            <a href={`/project/${project.developer}`}>{project.title}</a>
          </h5>
          <p className="card-text">Description: {project.description}</p>
          <p className="card-text">{project.developer}</p>
          <div className="card-footer border-2 border-white">
            <p className="card-text">
              <a href={project.homepage}>{project.homepage}</a>
            </p>
            <p className="card-text">
              <a href={project.repo}>{project.repo}</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
