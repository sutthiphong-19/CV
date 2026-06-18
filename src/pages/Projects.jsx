import { useEffect, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import sampleInputImg from "../assets/YL/test006.jpeg";
import sampleOutputImg from "../assets/test007.jpeg";

function Projects() {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compareSplit, setCompareSplit] = useState(50);

  const beforeImage = preview || sampleInputImg;
  const afterImage = result || sampleOutputImg;

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setDetections([]);
    setError(null);
    setCompareSplit(50);
    setImage(file);
  };

  const handleDetect = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(t("projects.errors.backendResponse"));
      }

      const data = await response.json();
      setResult(`data:image/jpeg;base64,${data.image}`);
      setDetections(data.detections || []);
      setCompareSplit(50);
    } catch (caughtError) {
      setError(caughtError.message || t("projects.errors.backendConnection"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="yolo-page">
      <section className="project-hero">
        <div className="project-hero-grid">
          <div className="project-hero-copy">
            <p className="showcase-kicker">{t("projects.kicker")}</p>
            <h2>{t("projects.title")}</h2>
            <p className="project-hero-note">{t("projects.note")}</p>

            <div className="project-badges">
              {t("projects.badges", { returnObjects: true }).map((badge) => (
                <span key={badge} className="tag-pill">
                  {badge}
                </span>
              ))}
            </div>

            <div className="project-hero-actions">
              <label className="upload-btn">
                {t("projects.actions.chooseImage")}
                <input type="file" accept="image/*" onChange={handleUpload} hidden />
              </label>

              {preview && (
                <button type="button" className="detect-btn" onClick={handleDetect} disabled={loading}>
                  {loading ? t("projects.actions.detecting") : t("projects.actions.detect")}
                </button>
              )}
            </div>
          </div>

          <aside className="project-hero-panel">
            <div className="project-steps">
              {["one", "two", "three"].map((stepId) => (
                <article key={stepId} className="project-step">
                  <span>{t(`projects.steps.${stepId}.label`)}</span>
                  <strong>{t(`projects.steps.${stepId}.title`)}</strong>
                  <p>{t(`projects.steps.${stepId}.description`)}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-block">
        <div className="section-header">
          <p className="section-kicker">{t("projects.exampleFlow.kicker")}</p>
          <h2>{t("projects.exampleFlow.title")}</h2>
        </div>

        <div className="project-tips">
          {t("projects.exampleFlow.items", { returnObjects: true }).map((item, index) => (
            <div key={item} className="tip-card">
              <span>{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-showcase">
        <div className="showcase-header">
          <div>
            <p className="showcase-kicker">{t("projects.showcase.kicker")}</p>
            <h3>{t("projects.showcase.title")}</h3>
          </div>
          <p className="showcase-note">{t("projects.showcase.note")}</p>
        </div>

        <div className="compare-shell">
          <div className="compare-stage" style={{ "--split": `${compareSplit}%` }}>
            <img
              className="compare-img compare-before"
              src={beforeImage}
              alt={t("projects.showcase.beforeAlt")}
              loading="lazy"
              decoding="async"
            />

            <div className="compare-after-wrap">
              <img
                className="compare-img compare-after"
                src={afterImage}
                alt={t("projects.showcase.afterAlt")}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="compare-divider" />
            <div className="compare-tag compare-tag-before">{t("projects.showcase.before")}</div>
            <div className="compare-tag compare-tag-after">{t("projects.showcase.after")}</div>
          </div>

          <label className="compare-control">
            <span>{t("projects.showcase.slider")}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={compareSplit}
              onChange={(event) => setCompareSplit(Number(event.target.value))}
            />
          </label>
        </div>
      </section>

      {error && <p className="yolo-error">{error}</p>}

      {preview && (
        <section className="section-block">
          <div className="section-header">
            <p className="section-kicker">{t("projects.result.kicker")}</p>
            <h2>{t("projects.result.title")}</h2>
          </div>

          <div className="yolo-result">
            <div className="yolo-img-box">
              <p className="img-label">{t("projects.result.original")}</p>
              <img src={preview} alt={t("projects.result.originalAlt")} loading="lazy" decoding="async" />
            </div>

            <div className="yolo-img-box">
              <p className="img-label">{t("projects.result.detected")}</p>
              {result ? (
                <img src={result} alt={t("projects.result.detectedAlt")} loading="lazy" decoding="async" />
              ) : (
                <div className="img-placeholder">
                  {loading ? t("projects.result.loadingPlaceholder") : t("projects.result.emptyPlaceholder")}
                </div>
              )}
            </div>
          </div>

          {detections.length > 0 && (
            <div className="detection-list">
              <h3>{t("projects.result.detections", { count: detections.length })}</h3>
              <div className="detection-items">
                {detections.map((detection, index) => (
                  <div key={`${detection.label}-${index}`} className="detection-item">
                    <span className="det-label">{detection.label}</span>
                    <div className="det-bar-wrap">
                      <div className="det-bar" style={{ width: `${detection.confidence * 100}%` }} />
                    </div>
                    <span className="confidence">{(detection.confidence * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Projects;
