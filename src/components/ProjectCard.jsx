function ProjectCard({ project }) {
  return (
    <div style={{
      width: "250px",
      margin: "10px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "10px"
    }}>
      {/* รูป */}
      <img 
        src={project.image_url} 
        alt={project.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />

      {/* ข้อมูล */}
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      {/* ปุ่ม */}
      <a href={project.file_url} target="_blank">
        <button>View</button>
      </a>
    </div>
  );
}

export default ProjectCard;