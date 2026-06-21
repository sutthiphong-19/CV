import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCode, FiCompass, FiLayers, FiMail, FiUser } from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import SkillsSection from "../components/SkillsSection";


const timelineIds = ["start", "webapp", "ai"];
const summaryItems = [
  { key: "focus", icon: FiCode },
  { key: "style", icon: FiLayers },
  { key: "goal", icon: FiCompass },
];
const portfolioRoutes = [
  { key: "prayuen", icon: FiUser },
  { key: "khonkaen", icon: FiLayers },
  { key: "project", icon: FiCode },
  { key: "history", icon: FiMail },
];

function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const focusInterests = t("about.focus.interests", { returnObjects: true });

  const openLink = () => {
    window.open(
      "https://th.trip.com/moments/detail/nong-ruea-1448671-14928121/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <div className="about-badge">{t("about.badge")}</div>
            <h1>{t("about.heroTitle")}</h1>
            <p className="about-intro">{t("about.intro1")}</p>
            <p className="about-intro">{t("about.intro2")}</p>

            <div className="about-summary-strip">
              {summaryItems.map(({ key, icon: Icon }) => (
                <article key={key} className="about-summary-item">
                  <div className="about-summary-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <span>{t(`about.stats.${key}.label`)}</span>
                    <strong>{t(`about.stats.${key}.title`)}</strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-actions">
              <button type="button" onClick={openLink} className="primary">
                {t("about.actions.more")}
              </button>
              <button type="button" onClick={() => navigate("/contact")} className="secondary">
                {t("about.actions.contact")}
              </button>
            </div>
          </div>

          <aside className="about-hero-panel">
            <div className="about-panel-heading">
              <p className="card-kicker">{t("about.focus.kicker")}</p>
              <h2>{t("about.focus.title")}</h2>
            </div>

            <div className="interest-list">
              {focusInterests.map((item) => (
                <span key={item} className="interest-pill">
                  {item}
                </span>
              ))}
            </div>

            <div className="about-stats">
              {summaryItems.map(({ key }) => (
                <article key={key} className="about-stat">
                  <span>{t(`about.stats.${key}.label`)}</span>
                  <strong>{t(`about.stats.${key}.title`)}</strong>
                  <p>{t(`about.stats.${key}.description`)}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="about-grid">
        <article className="about-card about-story">
          <p className="card-kicker">{t("about.story.kicker")}</p>
          <h2>{t("about.story.title")}</h2>
          <p>{t("about.story.paragraph1")}</p>
          <p>{t("about.story.paragraph2")}</p>

          <div className="about-story-points">
            {summaryItems.map(({ key, icon: Icon }) => (
              <article key={key} className="story-point">
                <div className="story-point-icon">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <strong>{t(`about.stats.${key}.title`)}</strong>
                  <p>{t(`about.stats.${key}.description`)}</p>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="about-card about-focus">
          <p className="card-kicker">{t("about.focus.kicker")}</p>
          <h2>{t("about.focus.title")}</h2>
          <p className="about-focus-note">{t("about.intro2")}</p>
          <div className="interest-list">
            {focusInterests.map((item) => (
              <span key={item} className="interest-pill">
                {item}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="about-section">
        <div className="section-header">
          <p className="section-kicker">{t("about.timeline.kicker")}</p>
          <h2>{t("about.timeline.title")}</h2>
        </div>

        <div className="timeline-grid">
          {timelineIds.map((itemId, index) => (
            <article key={itemId} className="timeline-card">
              <span className="timeline-step">{String(index + 1).padStart(2, "0")}</span>
              <span className="timeline-year">{t(`about.timeline.items.${itemId}.year`)}</span>
              <h3>{t(`about.timeline.items.${itemId}.title`)}</h3>
              <p>{t(`about.timeline.items.${itemId}.description`)}</p>
            </article>
          ))}
        </div>
      </section>
      <SkillsSection />

      <section className="about-section">
        <div className="section-header">
          <p className="section-kicker">{t("about.portfolio.kicker")}</p>
          <h2>{t("about.portfolio.title")}</h2>
        </div>

        <div className="portfolio-link-grid">
          {portfolioRoutes.map(({ key, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => navigate(`/portfolio/${key}`)}
              className="portfolio-link-card"
            >
              <div className="portfolio-link-icon">
                <Icon aria-hidden="true" />
              </div>
              <div className="portfolio-link-copy">
                <span>{t("common.portfolio")}</span>
                <strong>{t(`about.portfolio.${key}`)}</strong>
              </div>
              <FiArrowRight className="portfolio-link-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
