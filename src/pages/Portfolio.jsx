import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import portfolioData from "../data/portfolioData";

import label1 from "../assets/label1.jpg";
import PY1 from "../assets/PY/222.jpg";
import PY2 from "../assets/PY/333.jpg";
import PAO from "../assets/PAO/001.jpg";
import PAO1 from "../assets/PAO/002.jpg";
import img005 from "../assets/005.png";

const imageMap = {
  prayuen: { 1: PY1, 2: PY2 },
  khonkaen: { 1: PAO, 2: PAO1 },
  project: { 1: label1, 2: img005 },
  history: { 1: null },
};

function Portfolio() {
  const { section } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const data = portfolioData[section];

  if (!data) {
    return (
      <main className="portfolio-page">
        <section className="portfolio-shell">
          <button type="button" onClick={() => navigate("/about")} className="btn-secondary portfolio-back">
            {t("common.back")}
          </button>
          <div className="portfolio-hero">
            <p className="about-badge">{t("common.portfolio")}</p>
            <h1>{t("portfolio.notFoundTitle")}</h1>
            <p>{t("portfolio.notFoundDescription")}</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="portfolio-page">
      <section className="portfolio-shell">
        <button type="button" onClick={() => navigate("/about")} className="btn-secondary portfolio-back">
          {t("common.back")}
        </button>

        <div className="portfolio-hero">
          <p className="about-badge">{t("common.portfolio")}</p>
          <h1>{t(`portfolio.sections.${section}.title`)}</h1>
          <p>
            <strong>{t(`portfolio.sections.${section}.period`)}</strong>
            {" • "}
            {t("portfolio.roleSeparator")} {t(`portfolio.sections.${section}.role`)}
          </p>
          <p>{t(`portfolio.sections.${section}.overview`)}</p>
        </div>

        <div className="portfolio-content portfolio-grid">
          <section className="portfolio-cards">
            {data.items.map((itemId, index) => {
              const img = imageMap[section]?.[itemId];

              return (
                <article key={itemId} className="portfolio-card">
                  {img ? (
                    <img src={img} alt={t(`portfolio.sections.${section}.items.${itemId}.title`)} />
                  ) : (
                    <div className="showcase-placeholder">
                      <strong>{t("portfolio.notFoundTitle")}</strong>
                      <span>{t("portfolio.previewUnavailable")}</span>
                    </div>
                  )}

                  <div className="portfolio-card-body">
                    <p className="portfolio-meta">
                      {t("common.item")} {index + 1}
                    </p>
                    <h3>{t(`portfolio.sections.${section}.items.${itemId}.title`)}</h3>
                    <p>{t(`portfolio.sections.${section}.items.${itemId}.desc`)}</p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}

export default Portfolio;
