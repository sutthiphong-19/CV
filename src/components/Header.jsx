import { useTranslation } from "../hooks/useTranslation";

function Header() {
  const { t, i18n } = useTranslation();

  return (
    <div className="site-header">
      <div className="site-brand">
        <strong>{t("app.brand")}</strong>
        <span>{t("app.role")}</span>
      </div>

      <div className="site-header-actions">
        <span className="lang-label">{t("language.label")}</span>
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
    </div>
  );
}

export default Header;
