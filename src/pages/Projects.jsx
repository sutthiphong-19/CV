import { Link } from "react-router-dom";
import imgBB from "../assets/work.png";
import YL8 from "../assets/YL/train_batch0.jpg";

const projects = [
  {
    number: "01",
    badge: "WEB",
    title: "Portfolio Website",
    type: "Personal Website",
    description:
      "เว็บไซต์แฟ้มสะสมงานส่วนตัว ใช้แสดงข้อมูล ประวัติ ผลงาน และช่องทางติดต่อ พร้อมรองรับภาษาไทยและอังกฤษ",
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
      "ระบบจองสนามกีฬา มีขั้นตอนเลือกสนาม เลือกเวลา สรุปรายการจอง อัปโหลดสลิป และรอการอนุมัติจากผู้ดูแลระบบ",
    stack: ["Vue 3", "Pinia", "PrimeVue", "Node.js"],
    status: "กำลังพัฒนา",
    link: "/portfolio/sport-booking",
  },
  {
    number: "03",
    badge: "ERP",
    title: "Inventory / ERP System",
    type: "Business System",
    description:
      "ระบบจัดการสินค้า พนักงาน ลูกค้า การรับสินค้าเข้า การเบิกสินค้าออก และสรุปข้อมูลสำหรับธุรกิจ",
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
      "โปรเจกต์ตรวจจับวัตถุจากรูปภาพด้วย AI แสดงผลภาพก่อนและหลังประมวลผล เหมาะสำหรับงาน Computer Vision",
    stack: ["Python", "YOLO", "AI", "Object Detection"],
    status: "Prototype",
    link: "/portfolio/ai",
    image: YL8,
  },
];

function Projects() {
  return (
    <main className="projects-page">
      <section className="projects-intro-card">
        <div className="projects-intro-copy">
          <p className="about-badge">PROJECTS</p>

          <h1>
            ผลงานของผม
            <span> ที่พร้อมนำเสนอ</span>
          </h1>

          <p>
            รวมโปรเจกต์ที่ผมพัฒนาและฝึกฝน โดยเน้นงานที่ใช้งานได้จริง
            มีโครงสร้างชัดเจน อ่านง่าย และสามารถต่อยอดเป็นระบบจริงได้
          </p>
        </div>

        <div className="projects-intro-stats">
          <div>
            <span>ทั้งหมด</span>
            <strong>{projects.length}</strong>
            <p>โปรเจกต์</p>
          </div>

          <div>
            <span>สายงานหลัก</span>
            <strong>Full Stack</strong>
            <p>Frontend / Backend / AI</p>
          </div>
        </div>
      </section>

      <section className="projects-work-section">
        <div className="projects-work-head">
          <div>
            <p className="section-kicker">SELECTED WORKS</p>
            <h2>โปรเจกต์ที่น่าสนใจ</h2>
          </div>

          <p>
            เลือกดูรายละเอียดแต่ละโปรเจกต์ เพื่อดูแนวคิด เทคโนโลยี
            และสิ่งที่ได้เรียนรู้
          </p>
        </div>

        <div className="projects-grid-clean">
          {projects.map((project) => (
            <article className="project-clean-card" key={project.number}>
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

                <Link to={project.link} className="project-clean-link">
                  <span>ดูรายละเอียด</span>
                  <strong>→</strong>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;
