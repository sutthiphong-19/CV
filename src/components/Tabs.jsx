import { NavLink } from "react-router-dom";

function Tabs() {
  return (
    <div>
      {/* ปุ่ม Tab */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <NavLink to="/" end className="tab">หน้าแรก</NavLink>
        <NavLink to="/about" className="tab">ประวัติ</NavLink>
        <NavLink to="/contact" className="tab">ข้อมูลการติดต่อ</NavLink>
      </div>
    </div>
  );
}

export default Tabs;