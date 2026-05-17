import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="hero">
        <div className="avatar-wrap">
          <div className="avatar-ring"></div>
          <img src="/src/assets/งานอยู่ไหน.png" alt="Profile" className="avatar" />
        </div>
        <div className="hero-text">
          <h2>สวัสดีครับ  ผม <span>[สุทธิพงษ์ พงษ์สระพัง]</span></h2>
          <div className="role">Full Stack Developer</div>
          <p>เป็นนักศึกษาจบใหม่ที่หลงใหลในการพัฒนาเว็บและซอฟต์แวร์
             มีความสนใจด้านการใช้ React, Python และ Ai เป็นพิเศษ
             พร้อมที่จะศึกษาเพิ่มเติม มีความรับผิดชอบและพร้อมที่จะสนุกกับการทำงาน</p>
          <div className="cta-row">
            <button onClick={() => navigate("/projects")}>ดูผลงาน</button>
            <button className="outline" onClick={() => navigate("/contact")}>ข้อมูลการติดต่อ</button>
          </div>
        </div>
      </div>

      <div className="stats">

  <div className="stat-card">
    <img src="/src/assets/PY/111.jpg" alt="เทศบาลพระยืน" className="stat-img" />
    <div className="stat-body">
      <span className="stat-title">เทศบาลพระยืนมิ่งมงคล</span>
      <p className="stat-desc">จัดทำเอกสารดิจิทัลและโครงการ/กิจกรรมต่างๆ ของงานป้องกันฯ</p>
    </div>
  </div>

  <div className="stat-card">
    <img src="/src/assets/PAO/002.jpg" alt="อบจ.ขอนแก่น" className="stat-img" />
    <div className="stat-body">
      <span className="stat-title">องค์การบริหารส่วนจังหวัดขอนแก่น</span>
      <p className="stat-desc">ดูแลอุปกรณ์คอมพิวเตอร์และจัดทำเอกสารดิจิทัลเพื่อประชาสัมพันธ์</p>
    </div>
  </div>

  <div className="stat-card">
    <img src="/src/assets/YL/101.jpg" alt="โปรเจกต์" className="stat-img" />
    <div className="stat-body">
      <span className="stat-title">โครงงาน CS</span>
      <p className="stat-desc">Object Detection ด้วย YOLO และ Web App ด้วย Fluter + FastAPI</p>
    </div>
  </div>

</div>

          <h3 className="section-title">ทักษะหลัก</h3>
          <div className="skills-wrapper">
          <div className="skills-section">
          <h4>Frontend</h4>
         <div className="skills-grid">
      {["React", "JavaScript", "CSS", "HTML", "Vite"].map((s) => (
        <div key={s} className="skill-chip">{s}</div>
      ))}
    </div>
  </div>

  <div className="skills-section">
    <h4>Backend</h4>
    <div className="skills-grid">
      {["Python", "Node.js"].map((s) => (
        <div key={s} className="skill-chip">{s}</div>
      ))}
    </div>
  </div>

     <div className="skills-section">
       <h4>Database</h4>
         <div className="skills-grid">
          {["MYSQL"].map((s) => (
           <div key={s} className="skill-chip">{s}</div>
            ))}
        </div>
       </div>
      </div>
    </main>
  );
}

export default Home;