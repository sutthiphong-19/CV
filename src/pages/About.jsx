import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: "10px 24px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    cursor: "pointer",
    minWidth: "220px",
  };

  const openLink = () => {
    window.open("https://th.trip.com/moments/detail/nong-ruea-1448671-14928121/", "_blank");
  };

  return (
    <div>
      <h2>ประวัติ</h2>
      <p>
        สวัสดีครับผมนายสุทธิพงษ์ พงษ์สระพัง อายุ 23 ปี เป็นคนจังหวัดขอนแก่น อำเภอบ้านฝาง บ้านอยู่ที่ตำบลโคกงาม
        แหล่งท่องเที่ยวที่ใกล้บ้านจะมี หินช้างสี ข้างล่างหินช้างสีก็จะเป็นเขื่อนอุบลรัตน์{" "}
        <span
          onClick={openLink}
          style={{ color: "#4f46e5", textDecoration: "underline", cursor: "pointer" }}
        >
          ดูข้อมูลเพิ่มเติม
        </span>
      </p>
      <p>
        ผมเริ่มสนใจด้านการเขียนโปรแกรมตั้งแต่อายุ 18 ปี
        และเริ่มเรียนรู้ด้วยตนเองผ่านการทำโปรเจกต์จริง
        มีความสนใจในการพัฒนา Web Application โดยใช้ React.js
        และสามารถพัฒนา Backend API ด้วย Pythonและอื่นๆ (FastAPI)
        มีความสนใจด้าน Artificial Intelligence โดยเฉพาะ Object Detection
        และเคยพัฒนาโปรเจกต์ที่ใช้ YOLO สำหรับตรวจจับวัตถุจากภาพ
        เป้าหมายคือการพัฒนาทักษะให้สามารถสร้างระบบที่ใช้งานได้จริง
        และต่อยอดไปสู่การเป็น Full-stack Developer
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "2rem" }}>
        <button onClick={() => navigate("/portfolio/prayuen")} style={buttonStyle}>
          เทศบาลพระยืนมิ่งมงคล
        </button>
        <button onClick={() => navigate("/portfolio/khonkaen")} style={buttonStyle}>
          องค์การบริหารส่วนจังหวัดขอนแก่น
        </button>
        <button onClick={() => navigate("/portfolio/project")} style={buttonStyle}>
          โครงงาน
        </button>
        <button onClick={() => navigate("/portfolio/history")} style={buttonStyle}>
          ประวัติการทำงาน
        </button>
      </div>
    </div>
  );
}

export default About;