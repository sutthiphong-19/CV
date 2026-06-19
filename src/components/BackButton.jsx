import { useLocation, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  if (isHomePage) {
    return null;
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  return (
    <button type="button" className="back-button" onClick={handleBack}>
      <span className="back-button-icon">←</span>
      <span>ย้อนกลับ</span>
    </button>
  );
}

export default BackButton;