import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="side-label">เมนูหลัก</p>
      <NavLink to="/" end className={({isActive}) => "side-link" + (isActive ? " active" : "")}>🏠 หน้าแรก</NavLink>
      <NavLink to="/about" className={({isActive}) => "side-link" + (isActive ? " active" : "")}>👤 ประวัติ</NavLink>
      <NavLink to="/projects" className={({isActive}) => "side-link" + (isActive ? " active" : "")}>💼 ผลงาน</NavLink>
      <NavLink to="/contact" className={({isActive}) => "side-link" + (isActive ? " active" : "")}>✉️ ข้อมูลการติดต่อติดต่อ</NavLink>
    </aside>
  );
}

export default Sidebar;