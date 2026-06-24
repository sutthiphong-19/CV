import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import portfolioData from "../data/portfolioData";

const projectTitleMap = {
  portfolio: "Portfolio Website",
  "sport-booking": "Sport Booking Platform",
  erp: "Inventory / ERP System",
  ai: "AI Object Detection",
};

const gameTitleMap = {
  snake: "Snake Game",
  quiz: "Quiz Game",
  typing: "Typing Game",
};

function BackButton() {
  const location = useLocation();
  const { t } = useTranslation();

  if (location.pathname === "/") return null;

  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = [{ to: "/", label: t("nav.home") }];

  if (segments[0] === "about") {
    crumbs.push({ label: t("nav.about") });
  } else if (segments[0] === "contact") {
    crumbs.push({ label: t("nav.contact") });
  } else if (segments[0] === "projects") {
    crumbs.push({ label: t("nav.projects") });
  } else if (segments[0] === "game") {
    crumbs.push({ to: "/game", label: t("nav.game") });

    if (segments[1]) {
      crumbs.push({ label: gameTitleMap[segments[1]] ?? segments[1] });
    } else {
      crumbs[crumbs.length - 1] = { label: t("nav.game") };
    }
  } else if (segments[0] === "portfolio") {
    const section = segments[1];
    const isProjectDetail = section && projectTitleMap[section];

    if (isProjectDetail) {
      crumbs.push({ to: "/projects", label: t("nav.projects") });
      crumbs.push({ label: projectTitleMap[section] });
    } else {
      crumbs.push({ to: "/about", label: t("nav.about") });
      crumbs.push({
        label:
          section && portfolioData[section]
            ? t(`portfolio.sections.${section}.title`)
            : t("common.portfolio"),
      });
    }
  }

  return (
    <nav className="app-breadcrumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <span className="app-breadcrumbs-item" key={`${crumb.label}-${index}`}>
            {isLast || !crumb.to ? (
              <span
                className="app-breadcrumbs-current"
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.to} className="app-breadcrumbs-link">
                {crumb.label}
              </Link>
            )}

            {!isLast && <span className="app-breadcrumbs-separator">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

export default BackButton;
