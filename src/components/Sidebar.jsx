import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiGrid,
  FiHome,
  FiMail,
  FiPlayCircle,
  FiTerminal,
  FiUser,
} from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";

const mainLinks = [
  {
    to: "/",
    end: true,
    key: "home",
    icon: FiHome,
    accent: "01",
    detailKey: "home.eyebrow",
  },
  {
    to: "/about",
    key: "about",
    icon: FiUser,
    accent: "02",
    detailKey: "about.badge",
  },
  {
    to: "/projects",
    key: "projects",
    icon: FiBriefcase,
    accent: "03",
    detailKey: "projects.kicker",
  },
  {
    to: "/contact",
    key: "contact",
    icon: FiMail,
    accent: "04",
    detailKey: "contact.badge",
  },
  {
    to: "/game",
    key: "game",
    icon: FiPlayCircle,
    accent: "05",
    detailKey: "game.badge",
  },
];

const portfolioLinks = [
  { to: "/portfolio/prayuen", labelKey: "about.portfolio.prayuen", icon: FiFolder },
  { to: "/portfolio/khonkaen", labelKey: "about.portfolio.khonkaen", icon: FiGrid },
  { to: "/portfolio/project", labelKey: "about.portfolio.project", icon: FiBriefcase },
  { to: "/portfolio/history", labelKey: "about.portfolio.history", icon: FiFileText },
];

const gameLinks = [
  { to: "/game/snake", labelKey: "game.snake", icon: FiPlayCircle },
  { to: "/game/quiz", labelKey: "game.quiz", icon: FiTerminal },
  { to: "/game/typing", labelKey: "game.typing", icon: FiEdit3 },
];

const quickMetaKeys = ["role", "interests"];

function Sidebar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (!sidebarRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <aside className={`sidebar${isMenuOpen ? " is-open" : ""}`} ref={sidebarRef}>
      <div className="side-menu-head">
        <div className="side-menu-head-main">
          <div className="side-menu-badge">SP</div>

          <div className="side-menu-copy">
            <p className="side-label">{t("nav.menu")}</p>
            <strong className="side-heading">{t("common.portfolio")}</strong>
            <span className="side-subheading">{t("home.quickFacts.role.value")}</span>
          </div>
        </div>

        <button
          type="button"
          className={`side-more-button ${isMenuOpen ? "is-open" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={t("nav.menu")}
          aria-expanded={isMenuOpen}
          aria-controls="sidebar-navigation"
        >
          <span className="side-more-button-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="sidebar-shell" role="dialog" aria-modal={isMenuOpen ? "true" : undefined}>
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

        <section className="side-panel">
          <div className="side-panel-head">
            <p className="side-panel-kicker">MINI GAME</p>
            <strong>{t("game.title")}</strong>
          </div>

          <div className="side-shortcut-grid">
            {gameLinks.map(({ to, labelKey, icon: Icon }) => (
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
