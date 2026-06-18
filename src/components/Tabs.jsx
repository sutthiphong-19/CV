import { NavLink } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

function Tabs() {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <NavLink to="/" end className="tab">
          {t("nav.home")}
        </NavLink>
        <NavLink to="/about" className="tab">
          {t("nav.about")}
        </NavLink>
        <NavLink to="/contact" className="tab">
          {t("nav.contact")}
        </NavLink>
      </div>
    </div>
  );
}

export default Tabs;
