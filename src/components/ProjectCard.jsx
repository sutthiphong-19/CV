import { useTranslation } from "../hooks/useTranslation";

function ProjectCard({ project }) {
  const { t } = useTranslation();

  return (
    <div
      style={{
        width: "250px",
        margin: "10px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <img
        src={project.image_url}
        alt={project.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <a href={project.file_url} target="_blank" rel="noreferrer">
        <button>{t("common.view")}</button>
      </a>
    </div>
  );
}

export default ProjectCard;
