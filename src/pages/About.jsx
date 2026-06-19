import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import SkillsSection from "../components/SkillsSection";


const timelineIds = ["start", "webapp", "ai"];
const portfolioRoutes = ["prayuen", "khonkaen", "project", "history"];

function About() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
            <div className="about-stats">
              {["focus", "style", "goal"].map((key) => (
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
        </article>

        <article className="about-card about-focus">
          <p className="card-kicker">{t("about.focus.kicker")}</p>
          <h2>{t("about.focus.title")}</h2>
          <div className="interest-list">
            {t("about.focus.interests", { returnObjects: true }).map((item) => (
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
          {timelineIds.map((itemId) => (
            <article key={itemId} className="timeline-card">
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

        <div className="about-actions portfolio-actions">
          {portfolioRoutes.map((route) => (
            <button
              key={route}
              type="button"
              onClick={() => navigate(`/portfolio/${route}`)}
              className="secondary"
            >
              {t(`about.portfolio.${route}`)}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;