import { NavLink } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

const links = [
  { to: "/", end: true, key: "home" },
  { to: "/about", key: "about" },
  { to: "/projects", key: "projects" },
  { to: "/contact", key: "contact" },
];

function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <p className="side-label">{t("nav.menu")}</p>
      <nav className="sidebar-nav" aria-label={t("nav.menu")}>
        {links.map((link, index) => (
          <NavLink
            key={link.key}
            to={link.to}
            end={link.end}
            className={({ isActive }) => "side-link" + (isActive ? " active" : "")}
          >
            <span className="side-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{t(`nav.${link.key}`)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
