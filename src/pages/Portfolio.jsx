import { useNavigate, useParams } from "react-router-dom";
import portfolioData from "../data/portfolioData";

import label1 from "../assets/label1.jpg";
import PY1 from "../assets/PY/222.jpg";
import PY2 from "../assets/PY/333.jpg";
import PAO from "../assets/PAO/001.jpg";
import PAO1 from "../assets/PAO/002.jpg";
import img005 from "../assets/005.png";

const imageMap = {
  prayuen: { 1: PY1, 2: PY2 },
  khonkaen: { 1: PAO, 2: PAO1 },
  project: { 1: label1, 2: img005 },
  history: { 1: null },
};

function Portfolio() {
  const { section } = useParams();
  const navigate = useNavigate();
  const data = portfolioData[section];

  if (!data) {
    return (
      <main className="portfolio-page">
        <section className="portfolio-shell">
          <button type="button" onClick={() => navigate("/about")} className="btn-secondary portfolio-back">
            ← กลับ
          </button>
          <div className="portfolio-hero">
            <p className="about-badge">Portfolio</p>
            <h1>ไม่พบข้อมูล</h1>
            <p>ลิงก์นี้อาจไม่ถูกต้อง หรือยังไม่มี portfolio section สำหรับหน้านี้</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="portfolio-page">
      <section className="portfolio-shell">
        <button type="button" onClick={() => navigate("/about")} className="btn-secondary portfolio-back">
          ← กลับ
        </button>

        <div className="portfolio-hero">
          <p className="about-badge">Portfolio</p>
          <h1>{data.title}</h1>
          <p>
            <strong>{data.period}</strong> · {data.role}
          </p>
          <p>{data.overview}</p>
        </div>

        <div className="portfolio-content portfolio-grid">
          <section className="portfolio-cards">
            {data.items.map((item, index) => {
              const img = imageMap[section]?.[item.id];

              return (
                <article key={item.id} className="portfolio-card">
                  {img ? (
                    <img src={img} alt={item.title} />
                  ) : (
                    <div className="showcase-placeholder">
                      <strong>Preview not available</strong>
                      <span>สำหรับรายการนี้ยังไม่มีรูปภาพตัวอย่าง</span>
                    </div>
                  )}

                  <div className="portfolio-card-body">
                    <p className="portfolio-meta">Item {index + 1}</p>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
