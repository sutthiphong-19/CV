import { useLocation, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    // ถ้าอยู่หน้ารายละเอียดโปรเจกต์ ให้กลับไปหน้า Projects เสมอ
    if (location.pathname.startsWith("/portfolio/")) {
      navigate("/projects", { replace: true });
      return;
    }

    navigate(-1);
  };

  return (
    <button type="button" className="back-button" onClick={handleBack}>
      <span className="back-button-icon">←</span>
      <span>ย้อนกลับ</span>
    </button>
  );
}

export default BackButton;