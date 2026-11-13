import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import imgBB from "../assets/work.png";
import YL8 from "../assets/YL/train_batch0.jpg";
import Logo from "../assets/sport/Logo.png";

const projects = [
  {
    number: "01",
    badge: "WEB",
    title: "Portfolio Website",
    type: "Personal Website",
    description:
      "เว็บไซต์พอร์ตโฟลิโอส่วนตัวสำหรับแนะนำตัว แสดงผลงาน และเปิดช่องทางการติดต่อ โดยออกแบบให้ใช้งานง่ายทั้งบนมือถือและเดสก์ท็อป",
    stack: ["React", "Vite", "CSS", "Responsive"],
    relatedTech: ["React", "Vite", "CSS", "JavaScript", "HTML"],
    status: "พร้อมใช้งาน",
    link: "/portfolio/portfolio",
    image: imgBB,
  },
  {
    number: "02",
    badge: "APP",
    title: "Sport Booking Platform",
    type: "Web Application",
    description:
      "ระบบจองสนามกีฬาออนไลน์ มีขั้นตอนเลือกสนาม เลือกเวลา สรุปรายการจอง อัปโหลดสลิป และรอการอนุมัติจากผู้ดูแลระบบ",
    stack: ["Vue 3", "Pinia", "PrimeVue", "Node.js"],
    relatedTech: ["Vue.js", "Vue 3", "Pinia", "PrimeVue", "Node.js"],
    status: "กำลังพัฒนา",
    link: "/portfolio/sport-booking",
    image: Logo,
    featured: true,
    demoUrl: "https://sport-booking-x2r6.onrender.com/",
    summary: [
      "รองรับ flow ตั้งแต่เลือกสนามจนยืนยันการชำระเงิน",
      "โฟกัส UI ที่อ่านง่ายและใช้งานจริงบนมือถือ",
      "ออกแบบให้ต่อยอดฝั่งแอดมินและจัดการสถานะการจองได้",
    ],
  },
  {
    number: "03",
    badge: "ERP",
    title: "Inventory / ERP System",
    type: "Business System",
    description:
      "ระบบจัดการสินค้า พนักงาน ลูกค้า การรับเข้า การเบิกออก และสรุปข้อมูลสำหรับใช้งานในธุรกิจ",
    stack: ["Node.js", "Prisma", "PostgreSQL", "MongoDB"],
    relatedTech: ["Node.js", "Prisma", "PostgreSQL", "MongoDB"],
    status: "Backend พร้อมต่อยอด",
    link: "/portfolio/erp",
  },
  {
    number: "04",
    badge: "AI",
    title: "AI Object Detection",
    type: "AI Project",
    description:
      "โปรเจกต์ตรวจจับวัตถุจากรูปภาพด้วย AI แสดงผลก่อนและหลังประมวลผล เหมาะสำหรับต่อยอดงานสาย Computer Vision",
    stack: ["Python", "YOLO", "AI", "Object Detection"],
    relatedTech: ["Python", "YOLO", "AI", "Object Detection"],
    status: "Prototype",
    link: "/portfolio/ai",
    image: YL8,
  },
  {
    number: "05",
    badge: "GAME",
    title: "Mini Games Playground",
    type: "Interactive Web App",
    description:
      "รวมมินิเกมสำหรับทดลอง React logic การเชื่อมต่อ REST API และการบันทึกคะแนนด้วย Python FastAPI",
    stack: ["React", "JavaScript", "Python", "FastAPI"],
    relatedTech: ["React", "JavaScript", "Python", "FastAPI"],
    status: "พร้อมทดลองเล่น",
    link: "/game",
  },
  {
    number: "06",
    badge: "LAB",
    title: "Fixlab IT Support Learning Center",
    type: "IT Support Learning Platform",
    description:
      "ศูนย์เรียนรู้การแก้ปัญหาคอมพิวเตอร์ ครอบคลุมบทเรียนด้าน Windows, Hardware และ Network พร้อมคำสั่งและเครื่องมือสำหรับงาน IT Support",
    stack: ["IT Support", "Troubleshooting", "Learning Platform"],
    relatedTech: ["IT Support", "Troubleshooting", "Learning Platform"],
    status: "พร้อมใช้งาน",
    link: "/portfolio/fixlab",
    demoUrl: "https://cp-sp.onrender.com",
    featured: true,
    summary: [
      "รวบรวมบทเรียนแก้ปัญหาจากอาการที่พบได้จริง",
      "จัดเนื้อหาเป็นหมวดหมู่เพื่อค้นหาได้สะดวก",
      "มีคำสั่งและเครื่องมือประกอบการเรียนรู้",
    ],
  },
  {
    number: "07",
    badge: "CCTV",
    title: "Inside the CCTV",
    type: "Interactive Field Study",
    description:
      "บทเรียนเชิงโต้ตอบที่พาสำรวจส่วนประกอบของกล้องวงจรปิด เส้นทางสัญญาณ และการเชื่อมต่ออุปกรณ์จัดเก็บและแสดงผล",
    stack: ["CCTV", "Interactive Study", "Camera Systems"],
    relatedTech: ["CCTV", "Interactive Study", "Camera Systems"],
    status: "พร้อมใช้งาน",
    link: "/portfolio/cctv-study",
    demoUrl: "https://cctv-sp.onrender.com",
    featured: true,
    summary: [
      "สำรวจเลนส์และส่วนประกอบภายในกล้อง",
      "อธิบายเส้นทางสัญญาณภาพจากกล้องไปยังอุปกรณ์จัดเก็บ",
      "นำเสนอข้อมูลเป็นบทเรียนเชิงโต้ตอบ",
    ],
  },
];

const showcaseProjects = projects.filter((project) => project.number !== "01");

function ProjectRack() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectProject = (index) => {
    const track = trackRef.current;
    const slide = track?.children[index];

    if (!track || !slide) return;

    setActiveIndex(index);
    slide.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const updateActiveProject = () => {
    const track = trackRef.current;
    if (!track?.clientWidth) return;

    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(showcaseProjects.length - 1, Math.max(0, nextIndex)));
  };

  return (
    <section className="project-rack-showcase" aria-labelledby="project-rack-title">
      <header className="project-rack-heading">
        <div>
          <p>SELECTED PROJECTS</p>
          <h1 id="project-rack-title">
            <span>Interactive</span>
            <span>Project Showcase</span>
          </h1>
        </div>
        <p className="project-rack-heading-note">
          เลื่อน เลือก และสำรวจโปรเจกต์ ตั้งแต่ระบบจองสนามกีฬาไปจนถึงบทเรียน IT Support และ CCTV
        </p>
      </header>

      <div className="project-rack-monitor" style={{ "--project-index": activeIndex }}>
        <div className="project-rack-monitor-bar">
          <strong>SP / PROJECT ARCHIVE</strong>
          <div className="project-rack-monitor-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}</span>
        </div>

        <div
          className="project-rack-track"
          ref={trackRef}
          onScroll={updateActiveProject}
          tabIndex="0"
          aria-label="รายการโปรเจกต์แบบเลื่อนแนวนอน"
        >
          {showcaseProjects.map((project, index) => (
            <article className="project-rack-slide" key={project.number}>
              <div className={`project-rack-object project-rack-object-${project.badge.toLowerCase()}`}>
                <span className="project-rack-wire" aria-hidden="true" />
                <div className="project-rack-object-card">
                  {project.image ? (
                    <img src={project.image} alt="" loading={index === 0 ? "eager" : "lazy"} />
                  ) : (
                    <span className="project-rack-object-badge" aria-hidden="true">
                      {project.badge}
                    </span>
                  )}
                  <div className="project-rack-object-lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <span className="project-rack-shadow" aria-hidden="true" />
              </div>

              <div className="project-rack-copy">
                <div className="project-rack-meta">
                  <span>{project.type}</span>
                  <span>{project.status}</span>
                </div>
                <p className="project-rack-number">PROJECT / {project.number}</p>
                <h2>{project.title}</h2>
                <p className="project-rack-description">{project.description}</p>

                <div className="project-rack-stack" aria-label="เทคโนโลยีที่ใช้">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="project-rack-actions">
                  <Link to={project.link}>ดูรายละเอียด <span aria-hidden="true">↗</span></Link>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer">
                      เปิดเดโม <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="project-rack-rail" aria-hidden="true">
          <span />
          <span />
        </div>
      </div>

      <footer className="project-rack-controls">
        <p>PROJECTS / SCROLL · SELECT · EXPLORE</p>
        <div className="project-rack-selector" aria-label="เลือกโปรเจกต์">
          {showcaseProjects.map((project, index) => (
            <button
              type="button"
              key={project.number}
              className={activeIndex === index ? "is-active" : ""}
              onClick={() => selectProject(index)}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              <span>{project.number}</span>
              <strong>{project.title}</strong>
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
}

function ProjectCard({ project, featured = false }) {
  return (
    <article className={`project-clean-card ${featured ? "project-clean-card-featured" : ""}`}>
      <div className={`project-clean-cover ${project.image ? "has-image" : ""}`}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="project-clean-image"
            loading="lazy"
            decoding="async"
          />
        )}

        <div className="project-clean-cover-overlay" />

        <div className="project-clean-cover-top">
          <span>{project.number}</span>
          <small>{project.status}</small>
        </div>

        <div className="project-clean-badge">{project.badge}</div>
      </div>

      <div className="project-clean-body">
        <p className="project-clean-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-clean-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {featured && project.summary?.length > 0 && (
          <div className="project-clean-highlights">
            {project.summary.map((item) => (
              <div className="project-clean-highlight" key={item}>
                <strong />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div className="project-clean-actions">
          <Link to={project.link} className="project-clean-link">
            <span>ดูรายละเอียด</span>
            <strong>{">"}</strong>
          </Link>

          {featured && project.demoUrl && (
            <a
              href={project.demoUrl}
              className="project-clean-link project-clean-link-secondary"
              target="_blank"
              rel="noreferrer"
            >
              <span>เปิดเดโม</span>
              <strong>{">"}</strong>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { i18n, t } = useTranslation();
  const [searchParams] = useSearchParams();
  const activeTech = searchParams.get("tech")?.trim() || "";
  const normalizedTech = activeTech.toLocaleLowerCase();
  const isThai = i18n.language?.startsWith("th");
  const filteredProjects = activeTech
    ? projects.filter((project) =>
        (project.relatedTech || project.stack).some(
          (item) => item.toLocaleLowerCase() === normalizedTech,
        ),
      )
    : projects;

  return (
    <main className={`projects-page ${activeTech ? "" : "projects-page-showcase"}`}>
      {activeTech ? (
      <section className="projects-intro-card">
        <div className="projects-intro-copy">
          <p className="about-badge">{t("projectsPage.badge", { defaultValue: "PROJECTS" })}</p>

          <h1>
            {t("projectsPage.title", { defaultValue: "ผลงานที่เลือกมาเล่า" })}
            <span>
              {" "}
              {t("projectsPage.titleAccent", {
                defaultValue: "และสิ่งที่ได้เรียนรู้",
              })}
            </span>
          </h1>

          <p>
            {t("projectsPage.description", {
              defaultValue:
                "รวมโปรเจกต์ที่ผมพัฒนาและทดลองใช้งานจริง ทั้งงานเว็บแอป งานระบบธุรกิจ และงาน AI โดยให้ความสำคัญกับโครงสร้างที่ชัดเจนและแนวคิดแบบ product",
            })}
          </p>
        </div>

        <div className="projects-intro-stats">
          <div>
            <span>{t("projectsPage.stats.total.label", { defaultValue: "ทั้งหมด" })}</span>
            <strong>{projects.length} Projects</strong>
            <p>
              {t("projectsPage.stats.total.note", {
                defaultValue: "คัดเฉพาะงานที่สะท้อนแนวทางการพัฒนาแบบ Full Stack",
              })}
            </p>
          </div>

          <div>
            <span>{t("projectsPage.stats.focus.label", { defaultValue: "โฟกัสหลัก" })}</span>
            <strong>{t("projectsPage.stats.focus.title", { defaultValue: "Product Thinking" })}</strong>
            <p>
              {t("projectsPage.stats.focus.note", {
                defaultValue: "ออกแบบ flow ลงมือพัฒนา และเตรียมระบบให้พร้อมต่อยอด",
              })}
            </p>
          </div>
        </div>
      </section>
      ) : (
        <ProjectRack />
      )}

      {activeTech && (
        <section className="projects-filter-bar" aria-live="polite">
          <div className="projects-filter-copy">
            <p>{isThai ? "กำลังแสดงผลงานตามทักษะ" : "FILTERED BY TECHNOLOGY"}</p>
            <div>
              <span className="projects-filter-tag">{activeTech}</span>
              <strong>
                {isThai
                  ? `พบ ${filteredProjects.length} ผลงานที่เกี่ยวข้อง`
                  : `${filteredProjects.length} related project${filteredProjects.length === 1 ? "" : "s"}`}
              </strong>
            </div>
          </div>

          <Link to="/projects" className="projects-filter-clear">
            {isThai ? "ดูผลงานทั้งหมด" : "View all projects"}
            <span aria-hidden="true">×</span>
          </Link>
        </section>
      )}

      {activeTech && (
        <section className="projects-work-section">
          <>
            <div className="projects-work-head projects-filter-heading">
              <div>
                <p className="section-kicker">TECHNOLOGY PROJECTS</p>
                <h2>
                  {isThai ? "ผลงานที่ใช้ " : "Projects using "}
                  <span>{activeTech}</span>
                </h2>
              </div>
              <p>
                {isThai
                  ? "เลือกดูรายละเอียดของแต่ละโปรเจกต์เพื่ออ่านแนวคิด เทคโนโลยี และขั้นตอนการพัฒนา"
                  : "Open a project to explore its concept, technology, and development process."}
              </p>
            </div>

            {filteredProjects.length > 0 ? (
              <div className="projects-grid-clean projects-filter-grid">
                {filteredProjects.map((project) => (
                  <ProjectCard project={project} key={project.number} />
                ))}
              </div>
            ) : (
              <div className="projects-empty-state">
                <span aria-hidden="true">{`{ }`}</span>
                <div>
                  <h3>
                    {isThai
                      ? `ยังไม่มีผลงาน ${activeTech} ที่เผยแพร่`
                      : `No published ${activeTech} project yet`}
                  </h3>
                  <p>
                    {isThai
                      ? "ทักษะนี้อยู่ระหว่างนำไปพัฒนาโปรเจกต์ใหม่ ลองเลือกดูผลงานทั้งหมดก่อนได้ครับ"
                      : "A project using this skill is in progress. You can browse all published work for now."}
                  </p>
                </div>
                <Link to="/projects" className="project-clean-link">
                  <span>{isThai ? "ดูผลงานทั้งหมด" : "View all projects"}</span>
                  <strong>{">"}</strong>
                </Link>
              </div>
            )}
          </>
        </section>
      )}
    </main>
  );
}

export default Projects;
