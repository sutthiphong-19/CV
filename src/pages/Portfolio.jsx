import { useParams, useNavigate } from "react-router-dom";
import portfolioData from "../data_temp/portfolioData";

// ← import รูปทั้งหมดตรงนี้
import label1 from "../assets/label1.jpg";
import PY from "../assets/PY/111.jpg";
import PY1 from "../assets/PY/222.jpg";
import PY2 from "../assets/PY/333.jpg";
import PAO from "../assets/PAO/001.jpg";
import PAO1 from "../assets/PAO/002.jpg";
import assets from "../assets/005.png";


// จับคู่ section+id → รูป 
const imageMap = {
  prayuen: { 1: PY1, 2: PY2 },
  khonkaen: { 1: PAO, 2: PAO1 },
  project: { 1: label1, 2: assets },
  history: { 1: null },
};

function Portfolio() {
  const { section } = useParams();
  const navigate = useNavigate();
  const data = portfolioData[section];

  if (!data) return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <p style={{ color: "#9ca3af" }}>ไม่พบข้อมูล</p>
      <button onClick={() => navigate("/about")}
        style={{ marginTop: 12, padding: "8px 20px", borderRadius: 8, border: "1px solid #d1d5db", cursor: "pointer", background: "transparent" }}>
        ← กลับ
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: 750, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "sans-serif" }}>

      <button
        onClick={() => navigate("/about")}
        style={{ padding: "6px 16px", background: "transparent", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer", fontSize: 14, marginBottom: "1.5rem", color: "#374151" }}
      >
        ← กลับ
      </button>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", borderRadius: 16, padding: "2rem", marginBottom: "1.5rem", color: "#fff" }}>
        <p style={{ margin: "0 0 6px", fontSize: 13, opacity: 0.8 }}>{data.period}</p>
        <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700 }}>{data.title}</h2>
        <span style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 14px", fontSize: 13, marginBottom: 12 }}>
          {data.role}
        </span>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.9, lineHeight: 1.7 }}>{data.overview}</p>
      </div>

      <h3 style={{ margin: "0 0 1rem", fontSize: 16, color: "#374151" }}>ผลงาน / งานที่รับผิดชอบ</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.items.map((item, index) => {
          const img = imageMap[section]?.[item.id];
          return (
            <div key={item.id} style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
              {img ? (
                <img src={img} alt={item.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: 180, background: `hsl(${240 + index * 30}, 70%, 95%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 48, opacity: 0.4 }}>🖼</span>
                </div>
              )}
              <div style={{ padding: "1.1rem 1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#4f46e5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                    {index + 1}
                  </span>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#111827" }}>{item.title}</h4>
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "#6b7280", lineHeight: 1.75, paddingLeft: 36 }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;