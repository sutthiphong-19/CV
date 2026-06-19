import { FaCss3Alt } from "react-icons/fa";

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiVite,
  SiPython,
  SiNodedotjs,
  SiFastapi,
  SiGo,
  SiMysql,
  SiDocker,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572b6" },
      { name: "Vite", icon: SiVite, color: "#646cff" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Golang", icon: SiGo, color: "#00add8" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
    ],
  },
];

function SkillsSection() {
  return (
    <section className="about-section about-tech-section">
      <div className="section-header">
        <p className="section-kicker">ทักษะต่างๆ</p>
        <h2>ทักษะหลัก</h2>
      </div>

      <div className="about-tech-grid">
        {skillGroups.map((group) => (
          <article key={group.title} className="about-tech-card">
            <h3>{group.title}</h3>

            <div className="about-tech-list">
              {group.skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <span key={skill.name} className="about-tech-pill">
                    <Icon
                      className="about-tech-icon"
                      style={{ color: skill.color }}
                      aria-hidden="true"
                    />
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;