import { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="side-menu-head">
        <p className="side-label">{t("nav.menu")}</p>

        <button
          type="button"
          className={`side-more-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="เปิดเมนู"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {isMenuOpen && (
        <nav className="sidebar-nav menu-open" aria-label={t("nav.menu")}>
          {links.map((link, index) => (
            <NavLink
              key={link.key}
              to={link.to}
              end={link.end}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                "side-link" + (isActive ? " active" : "")
              }
            >
              <span className="side-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{t(`nav.${link.key}`)}</span>
            </NavLink>
          ))}
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;