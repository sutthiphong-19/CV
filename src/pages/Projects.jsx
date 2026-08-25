import { Link } from "react-router-dom";
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
    status: "Prototype",
    link: "/portfolio/ai",
    image: YL8,
  },
];

const featuredProject = projects.find((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

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
  const { t } = useTranslation();

  return (
    <main className="projects-page">
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

      <section className="projects-work-section">
        <div className="projects-work-head">
          <div>
            <p className="section-kicker">
              {t("projectsPage.sections.featured.kicker", {
                defaultValue: "FEATURED PROJECT",
              })}
            </p>
            <h2>
              {t("projectsPage.sections.featured.title", {
                defaultValue: "โปรเจกต์เด่นที่กำลังพัฒนา",
              })}
            </h2>
          </div>

          <p>
            {t("projectsPage.sections.featured.description", {
              defaultValue:
                "งานที่เลือกมาเน้นการเล่า flow การใช้งานจริง เทคโนโลยีที่ใช้ และแนวคิดในการออกแบบระบบให้เห็นทั้งภาพรวมและรายละเอียด",
            })}
          </p>
        </div>

        {featuredProject && <ProjectCard project={featuredProject} featured />}

        <div className="projects-work-head projects-work-head-secondary">
          <div>
            <p className="section-kicker">
              {t("projectsPage.sections.selected.kicker", {
                defaultValue: "SELECTED WORKS",
              })}
            </p>
            <h2>
              {t("projectsPage.sections.selected.title", {
                defaultValue: "โปรเจกต์อื่นที่น่าสนใจ",
              })}
            </h2>
          </div>
        </div>

        <div className="projects-grid-clean">
          {otherProjects.map((project) => (
            <ProjectCard project={project} key={project.number} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;
