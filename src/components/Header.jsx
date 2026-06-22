import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiArrowRight,
  FiClock,
  FiCompass,
  FiMail,
  FiMoon,
  FiPlayCircle,
  FiSun,
} from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import { useTheme } from "../hooks/useTheme";

const routeMeta = {
  "/": {
    titleKey: "nav.home",
    labelKey: "home.eyebrow",
    detailKey: "home.quickFacts.focus.value",
    icon: FiCompass,
  },
  "/about": {
    titleKey: "nav.about",
    labelKey: "about.badge",
    detailKey: "about.heroTitle",
    icon: FiCompass,
  },
  "/projects": {
    titleKey: "nav.projects",
    labelKey: "projects.kicker",
    detailKey: "projects.title",
    icon: FiCompass,
  },
  "/contact": {
    titleKey: "nav.contact",
    labelKey: "contact.badge",
    detailKey: "contact.title",
    icon: FiMail,
  },
  "/game": {
    titleKey: "nav.game",
    labelKey: "game.badge",
    detailKey: "game.subtitle",
    icon: FiPlayCircle,
  },
};

function Header() {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const headerRef = useRef(null);
  const isThai = i18n.language === "th";

  const themeLabels = isThai
    ? {
        label: "ธีม",
        light: "สว่าง",
        dark: "มืด",
        toggle: "สลับธีม",
      }
    : {
        label: "Theme",
        light: "Light",
        dark: "Dark",
        toggle: "Toggle theme",
      };

  const isPortfolioRoute = location.pathname.startsWith("/portfolio/");
  const currentRouteMeta = routeMeta[location.pathname] || routeMeta["/"];

  const meta = isPortfolioRoute
    ? {
        title: t("common.portfolio"),
        label: t("about.portfolio.kicker"),
        detail: t("about.portfolio.title"),
        Icon: FiCompass,
      }
    : {
        title: t(currentRouteMeta.titleKey),
        label: t(currentRouteMeta.labelKey),
        detail: t(currentRouteMeta.detailKey),
        Icon: currentRouteMeta.icon,
      };

  const { title, Icon } = meta;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (!headerRef.current) {
        return;
      }

      const height = Math.ceil(headerRef.current.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--app-header-height", `${height}px`);
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeaderHeight();
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, [i18n.language, location.pathname]);

  return (
    <header className="app-header" ref={headerRef}>
      <div className="site-header">
        <div className="site-identity">
          <Link to="/" className="site-identity-link" aria-label={t("profile.name")}>
            <div className="site-brand-mark">SP</div>
            <div className="site-brand-copy">
              <strong>{t("profile.name")}</strong>
              <span>{t("home.quickFacts.role.value")}</span>
            </div>
          </Link>
        </div>

        <div className="site-context-card">
          <div className="site-context-icon" aria-hidden="true">
            <Icon />
          </div>
          <div className="site-context-copy">
            <strong>{title}</strong>
          </div>
        </div>

        <div className="site-header-actions">
          <button
            type="button"
            className={`theme-toggle${isDark ? " is-dark" : ""}`}
            onClick={toggleTheme}
            aria-label={themeLabels.toggle}
            title={themeLabels.toggle}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDark ? <FiSun /> : <FiMoon />}
            </span>
            <span className="theme-toggle-copy">
              <span>{themeLabels.label}</span>
              <strong>{isDark ? themeLabels.dark : themeLabels.light}</strong>
            </span>
          </button>

          <div className="site-meta-pill">
            <FiClock aria-hidden="true" />
            <span>{t("language.label")}</span>
            <strong>{i18n.language.toUpperCase()}</strong>
          </div>

          <div className="header-language">
            <div className="lang-switch" role="group" aria-label={t("language.label")}>
              {["th", "en"].map((language) => (
                <button
                  key={language}
                  type="button"
                  className={`lang-btn${i18n.language === language ? " active" : ""}`}
                  aria-pressed={i18n.language === language}
                  onClick={() => i18n.changeLanguage(language)}
                >
                  {t(`language.${language}`)}
                </button>
              ))}
            </div>
          </div>

          <Link to="/contact" className="header-primary-link">
            <span>{t("nav.contact")}</span>
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;