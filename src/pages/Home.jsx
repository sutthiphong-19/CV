import { useNavigate } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import profileImg from "../assets/work.png";
import pyImg from "../assets/PY/111.jpg";
import paoImg from "../assets/PAO/002.jpg";
import ylImg from "../assets/YL/101.jpg";
import SkillsSection from "../components/SkillsSection";

const highlightItems = [
  { id: "prayuen", image: pyImg },
  { id: "khonkaen", image: paoImg },
  { id: "csProject", image: ylImg },
];

const skillGroupIds = ["frontend", "backend", "database"];
const quickFactIds = ["role", "interests", "focus"];

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="home-page">
      <section className="hero-panel">
        <div className="hero-copy flex flex-column">
          <p className="eyebrow">{t("home.eyebrow")}</p>
          <h1>
          <span>{t("profile.name")}</span>
          </h1>
          <p className="hero-description">{t("home.heroDescription")}</p>

          <div className="cta-row flex flex-wrap">
            <button type="button" onClick={() => navigate("/projects")}>
              {t("home.ctas.projects")}
            </button>
            <button type="button" className="outline" onClick={() => navigate("/contact")}>
              {t("home.ctas.contact")}
            </button>
          </div>
        </div>

        <aside className="hero-visual flex flex-column align-items-center">
          <div className="hero-visual-panel">
            <div className="avatar-wrap mx-auto">
              <div className="avatar-ring" />
              <img
                src={profileImg}
                alt={t("profile.name")}
                className="avatar"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <div className="hero-facts">
            <div className="grid">
              {quickFactIds.map((factId) => (
                <div key={factId} className="col-12">
                  <article className="hero-fact h-full">
                    <span>{t(`home.quickFacts.${factId}.label`)}</span>
                    <strong>{t(`home.quickFacts.${factId}.value`)}</strong>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="section-block">
        <div className="section-header flex flex-column">
          <p className="section-kicker">{t("home.highlights.kicker")}</p>
          <h2>{t("home.highlights.title")}</h2>
        </div>

        <div className="grid">
          {highlightItems.map((item) => (
            <div key={item.id} className="col-12 md:col-6 xl:col-4">
              <article className="stat-card highlight-card h-full">
                <img
                  src={item.image}
                  alt={t(`home.highlights.items.${item.id}.alt`)}
                  className="stat-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="stat-body">
                  <span className="stat-title">{t(`home.highlights.items.${item.id}.title`)}</span>
                  <p className="stat-desc">{t(`home.highlights.items.${item.id}.description`)}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
        <SkillsSection />
      </section>
    </main>
  );
}

export default Home;
