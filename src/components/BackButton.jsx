import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BACK_CLICK_KEY = "back-button-clicked-once";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const [hasClickedBack, setHasClickedBack] = useState(() => {
    return sessionStorage.getItem(BACK_CLICK_KEY) === "true";
  });

  useEffect(() => {
    // ถ้ากลับมาหน้าแรกแล้ว ให้ reset การนับใหม่
    if (location.pathname === "/") {
      sessionStorage.removeItem(BACK_CLICK_KEY);
      setHasClickedBack(false);
    }
  }, [location.pathname]);

  if (location.pathname === "/") return null;

  const handleBack = () => {
    // กดครั้งที่ 2 เป็นต้นไป ให้กลับหน้าแรก
    if (hasClickedBack) {
      sessionStorage.removeItem(BACK_CLICK_KEY);
      setHasClickedBack(false);
      navigate("/", { replace: true });
      return;
    }

    // กดครั้งแรก ให้ย้อนกลับหน้าก่อนหน้า
    sessionStorage.setItem(BACK_CLICK_KEY, "true");
    setHasClickedBack(true);
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