import { FaCss3Alt } from "react-icons/fa";
import {
  SiDocker,
  SiFastapi,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import { useTranslation } from "../hooks/useTranslation";

const skillGroups = [
  {
    id: "frontend",
    skills: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#42b883" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "HTML", icon: SiHtml5, color: "#e34f26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572b6" },
      { name: "Vite", icon: SiVite, color: "#646cff" },
    ],
  },
  {
    id: "backend",
    skills: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Golang", icon: SiGo, color: "#00add8" },
    ],
  },
  {
    id: "database",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
    ],
  },
];

function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section className="about-section about-tech-section">
      <div className="section-header">
        <p className="section-kicker">{t("home.skills.kicker")}</p>
        <h2>{t("home.skills.title")}</h2>
      </div>

      <div className="about-tech-grid">
        {skillGroups.map((group) => (
          <article key={group.id} className="about-tech-card">
            <div className="about-tech-card-head">
              <h3>{t(`home.skills.groups.${group.id}.title`)}</h3>
              <span>{group.skills.length}</span>
            </div>

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

            <p className="about-tech-note">
              {t(`home.skills.groups.${group.id}.items`, { returnObjects: true }).join(" / ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
