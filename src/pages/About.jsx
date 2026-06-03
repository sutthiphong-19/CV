import { useNavigate } from "react-router-dom";

const milestones = [
  {
    year: "ความสนใจ",
    title: "เริ่มศึกษาและเรียนรู้โค้ด",
    description: "เริ่มสนใจการเขียนโปรแกรมตั้งแต่อายุ 18 ปี และเรียนรู้ด้วยตัวเองจากโปรเจกต์จริงและการศึกษาผ่านช่องทางต่างๆ สนใจการทำงานด้านนี้และพร้อมที่จะศึกษาหาความรู้ตลอดเวลา",
  },
  {
    year: "React + Python",
    title: "โฟกัสสาย Web App",
    description: "ชอบพัฒนาเว็บแอปที่ใช้งานได้จริง โดยเชื่อม Frontend กับ Backend ให้ทำงานร่วมกันได้ดี",
  },
  {
    year: "AI / YOLO",
    title: "ต่อยอดงานด้าน AI",
    description: "สนใจ Object Detection และการนำ AI ไปช่วยแก้ปัญหาในงานจริงให้มีประโยชน์มากขึ้น",
  },
];

const interests = [
  "Web Application",
  "Backend API",
  "AI / Object Detection",
  "UI ที่ใช้งานง่าย",
];

function About() {
  const navigate = useNavigate();

  const openLink = () => {
    window.open("https://th.trip.com/moments/detail/nong-ruea-1448671-14928121/", "_blank");
  };

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-badge">About Me</div>
        <h1>ประวัติและเส้นทางการเรียนรู้ของผม</h1>
        <p className="about-intro">
          สวัสดีครับ ผมนายสุทธิพงษ์ พงษ์สระพัง เป็นคนจังหวัดขอนแก่น อำเภอบ้านฝาง บ้านอยู่ที่ตำบลโคกงาม
          แหล่งท่องเที่ยวใกล้บ้านจะมี อุทยานแห่งชาติน้ำพอง จุดชมวิวหินช้างสี เขื่อนอุบลรัตน์
        </p>

        <div className="about-actions">
          <button type="button" onClick={openLink} className="primary">
            ดูข้อมูลเพิ่มเติม
          </button>
          <button type="button" onClick={() => navigate("/contact")} className="secondary">
            ติดต่อผม
          </button>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-card about-story">
          <p className="card-kicker">Story</p>
          <h2>สิ่งที่สนใจและอยากศึกษาต่อ</h2>
          <p>
            ผมเริ่มสนใจด้านการเขียนโปรแกรมตั้งแต่อายุ 18 ปี และค่อย ๆ เรียนรู้ด้วยตัวเองผ่านการทำโปรเจกต์จริง
            จุดที่ทำให้สนุกคือการได้เห็นไอเดียกลายเป็นระบบที่ใช้งานได้จริง ไม่ว่าจะเป็นเว็บไซต์
            ระบบหลังบ้าน หรือการต่อยอดไปสู่ AI
          </p>
          <p>
            ความถนัดหลักของผมคือการพัฒนา Web Application ด้วย React.js และการสร้าง Backend API ด้วย Python
            และ FastAPI รวมถึงสนใจงานด้าน Artificial Intelligence โดยเฉพาะ Object Detection และ YOLO
          </p>
        </article>

        <article className="about-card about-focus">
          <p className="card-kicker">Focus</p>
          <h2>สิ่งที่ผมตั้งใจพัฒนา</h2>
          <div className="interest-list">
            {interests.map((item) => (
              <span key={item} className="interest-pill">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="about-section">
        <div className="section-header">
          <p className="section-kicker">Timeline</p>
          <h2>เส้นทางที่พาผมมาถึงจุดนี้</h2>
        </div>

        <div className="timeline-grid">
          {milestones.map((item) => (
            <article key={item.title} className="timeline-card">
              <span className="timeline-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="section-header">
          <p className="section-kicker">Portfolio</p>
          <h2>ถ้าอยากดูผลงานแยกเป็นหมวด</h2>
        </div>

        <div className="about-actions portfolio-actions">
          <button type="button" onClick={() => navigate("/portfolio/prayuen")} className="secondary">
            เทศบาลพระยืนเมืองมงคล
          </button>
          <button type="button" onClick={() => navigate("/portfolio/khonkaen")} className="secondary">
            อบจ.ขอนแก่น
          </button>
          <button type="button" onClick={() => navigate("/portfolio/project")} className="secondary">
            โครงงาน
          </button>
          <button type="button" onClick={() => navigate("/portfolio/history")} className="secondary">
            ประวัติการทำงาน
          </button>
        </div>
      </section>
    </main>
  );
}

export default About;
