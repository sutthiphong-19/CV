import { useNavigate } from "react-router-dom";
import profileImg from "../assets/work.png";
import pyImg from "../assets/PY/111.jpg";
import paoImg from "../assets/PAO/002.jpg";
import ylImg from "../assets/YL/101.jpg";

const highlights = [
  {
    image: pyImg,
    alt: "เทศบาลพระยืน",
    title: "เทศบาลพระยืนมิ่งมงคล",
    description: "จัดการทำเอกสารต่างๆ ตั้งแต่บันทึกขอใช้-คำสั่งใช้-รายงานผล-ฎีกา",
  },
  {
    image: paoImg,
    alt: "อบจ.ขอนแก่น",
    title: "องค์การบริหารส่วนจังหวัดขอนแก่น",
    description: "ดูแลอุปกรณ์คอมพิวเตอร์และจัดทำเอกสารดิจิทัลเพื่อสนับสนุนการทำงานของหน่วยงาน",
  },
  {
    image: ylImg,
    alt: "โปรเจกต์ CS",
    title: "โครงงาน CS",
    description: "ทำ Object Detection ด้วย YOLO และต่อยอดเป็น Web App ด้วย Flutter + FastAPI",
  },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "HTML", "CSS", "Vite"],
  },
  {
    title: "Backend",
    items: ["Python", "Node.js", "FastAPI", "Golang"],
  },
  {
    title: "Database",
    items: ["MySQL", "Docker"],
  },
];

const quickFacts = [
  { label: "สายงาน", value: "Full Stack Developer" },
  { label: "ความสนใจ", value: "React, Node.js, Python, AI" },
  { label: "โฟกัส", value: "การได้มีส่วนร่วมทำงานกับทีมพัฒนา ระบบต่างๆ ที่ใช้งานจริง" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="hero-panel">
        <div className="avatar-wrap">
          <div className="avatar-ring" />
          <img src={profileImg} alt="Profile" className="avatar" />
        </div>

        <div className="hero-text">
          <p className="eyebrow">Portfolio / Full Stack Developer</p>
          <h1>
            สวัสดีครับ ผม <span>สุทธิพงษ์ พงษ์สระพัง</span>
          </h1>
          <p className="hero-description">
            สวัสดีครับ ผมเป็นนักศึกษาจบใหม่ที่มีความมุ่งมั่นด้านการพัฒนาเว็บไซต์และซอฟต์แวร์ มีพื้นฐานแน่นด้าน 
            Frontend ด้วย React และกำลังศึกษาต่อยอด Backend ด้วย Node.js และ Golang 
            เป็นคนพร้อมเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ สามารถเริ่มงานได้ทันทีครับ ขอบคุณที่สละเวลาพิจารณาครับ
          </p>

          <div className="cta-row">
            <button type="button" onClick={() => navigate("/projects")}>
              ดูผลงาน
            </button>
            <button type="button" className="outline" onClick={() => navigate("/contact")}>
              สามารถติดต่อผมจากข้อมูลได้ที่นี้ได้เลยครับ
            </button>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <p className="section-kicker">Quick Facts</p>
          <h2>สิ่งที่ผมโฟกัสอยู่ตอนนี้</h2>
        </div>

        <div className="facts-grid">
          {quickFacts.map((fact) => (
            <article key={fact.label} className="fact-card">
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <p className="section-kicker">Highlights</p>
          <h2>ประสบการณ์และโปรเจกต์ที่อยากเล่าให้ดู</h2>
        </div>

        <div className="highlights-grid">
          {highlights.map((item) => (
            <article key={item.title} className="stat-card highlight-card">
              <img src={item.image} alt={item.alt} className="stat-img" />
              <div className="stat-body">
                <span className="stat-title">{item.title}</span>
                <p className="stat-desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <p className="section-kicker">Skills</p>
          <h2>ทักษะหลัก</h2>
        </div>

        <div className="skills-wrapper">
          {skillGroups.map((group) => (
            <article key={group.title} className="skills-section">
              <h3>{group.title}</h3>
              <div className="skills-grid">
                {group.items.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
