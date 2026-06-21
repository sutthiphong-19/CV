import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiFileText,
  FiFolder,
  FiGrid,
  FiHome,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";

const mainLinks = [
  { to: "/", end: true, key: "home", icon: FiHome, accent: "01", detailKey: "home.eyebrow" },
  { to: "/about", key: "about", icon: FiUser, accent: "02", detailKey: "about.badge" },
  { to: "/projects", key: "projects", icon: FiBriefcase, accent: "03", detailKey: "projects.kicker" },
  { to: "/contact", key: "contact", icon: FiMail, accent: "04", detailKey: "contact.badge" },
];

const portfolioLinks = [
  { to: "/portfolio/prayuen", labelKey: "about.portfolio.prayuen", icon: FiFolder },
  { to: "/portfolio/khonkaen", labelKey: "about.portfolio.khonkaen", icon: FiGrid },
  { to: "/portfolio/project", labelKey: "about.portfolio.project", icon: FiBriefcase },
  { to: "/portfolio/history", labelKey: "about.portfolio.history", icon: FiFileText },
];

const quickMetaKeys = ["role", "interests"];

function Sidebar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <aside className={`sidebar${isMenuOpen ? " is-open" : ""}`}>
      <div className="side-menu-head">
        <div className="side-menu-copy">
          <p className="side-label">{t("nav.menu")}</p>
          <strong className="side-heading">{t("common.portfolio")}</strong>
          <span className="side-subheading">{t("home.quickFacts.role.value")}</span>
        </div>

        <button
          type="button"
          className={`side-more-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={t("nav.menu")}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className="sidebar-shell">
        <section className="side-panel side-overview-panel">
          <div className="side-overview-head">
            <div className="side-overview-badge">SP</div>
            <div className="side-overview-copy">
              <strong>{t("profile.name")}</strong>
              <p>{t("home.quickFacts.role.value")}</p>
            </div>
          </div>

          <div className="side-meta-row">
            {quickMetaKeys.map((key) => (
              <span key={key} className="side-meta-chip">
                {t(`home.quickFacts.${key}.label`)}
              </span>
            ))}
          </div>
        </section>

        <section className="side-panel">
          <div className="side-panel-head">
            <p className="side-panel-kicker">{t("nav.menu")}</p>
            <strong>{t("common.view")}</strong>
          </div>

          <nav id="sidebar-navigation" className={`sidebar-nav${isMenuOpen ? " menu-open" : ""}`}>
            {mainLinks.map(({ to, end, key, icon: Icon, accent, detailKey }) => (
              <NavLink
                key={key}
                to={to}
                end={end}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `side-link${isActive ? " active" : ""}`}
              >
                <span className="side-link-accent">{accent}</span>
                <span className="side-link-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="side-link-copy">
                  <strong>{t(`nav.${key}`)}</strong>
                  <span>{t(detailKey)}</span>
                </span>
                <FiArrowRight className="side-link-arrow" aria-hidden="true" />
              </NavLink>
            ))}
          </nav>
        </section>

        <section className="side-panel">
          <div className="side-panel-head">
            <p className="side-panel-kicker">{t("common.portfolio")}</p>
            <strong>{t("about.portfolio.title")}</strong>
          </div>

          <div className="side-shortcut-grid">
            {portfolioLinks.map(({ to, labelKey, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `side-shortcut-card${isActive ? " active" : ""}`}
              >
                <span className="side-shortcut-icon" aria-hidden="true">
                  <Icon />
                </span>
                <strong>{t(labelKey)}</strong>
              </NavLink>
            ))}
          </div>
        </section>

        <section className="side-panel side-cta-card">
          <p className="side-panel-kicker">{t("contact.badge")}</p>
          <strong>{t("contact.title")}</strong>
          <NavLink to="/contact" className="side-cta-link" onClick={() => setIsMenuOpen(false)}>
            <span>{t("nav.contact")}</span>
            <FiArrowRight aria-hidden="true" />
          </NavLink>
        </section>
      </div>
    </aside>
  );
}

export default Sidebar;
