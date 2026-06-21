import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import lineQrImage from "../assets/line-qr.jpg";

function Contact() {
  const { t } = useTranslation();
  const [isLineQrOpen, setIsLineQrOpen] = useState(false);

  const openFacebook = () => {
    window.open(
      "https://www.facebook.com/Suttiphong%20Phongsraphang","_blank","noopener,noreferrer"
    );
  };

  const openGithub = () => {
    window.open(
      "https://github.com/sutthiphong-19","_blank","noopener,noreferrer"
    );
  };

  const openTiktok = () => {
    window.open(
      "https://www.tiktok.com/severus_jr","_blank","noopener,noreferrer"
    );
  };


  const openLineQr = () => {
    setIsLineQrOpen(true);
  };

  const closeLineQr = () => {
    setIsLineQrOpen(false);
  };

  return (
    <main className="contact-page">
      <section className="contact-shell">
        <p className="about-badge">{t("contact.badge")}</p>
        <h1 className="contact-title">{t("contact.title")}</h1>
        <p className="contact-note">{t("contact.note")}</p>

        <div className="contact-grid">
          <article className="contact-card">
            <div className="contact-icon email">E</div>
            <div>
              <p className="contact-label">{t("contact.items.email")}</p>
              <p className="contact-value">suttiphong.p@kkumail.com</p>
            </div>
          </article>

          <article className="contact-card">
            <div className="contact-icon phone">P</div>
            <div>
              <p className="contact-label">{t("contact.items.phone")}</p>
              <p className="contact-value">096-885-8683</p>
            </div>
          </article>

          <button
            type="button"
            onClick={openFacebook}
            className="contact-card is-clickable"
          >
            <div className="contact-icon facebook">F</div>
            <div>
              <p className="contact-label">{t("contact.items.facebook")}</p>
              <p className="contact-value">suttiphong phongsraphang</p>
            </div>
          </button>

          <button
            type="button"
            onClick={openGithub}
            className="contact-card is-clickable"
          >
            <div className="contact-icon github">G</div>
            <div>
              <p className="contact-label">{t("contact.items.github")}</p>
              <p className="contact-value">sutthiphong-19</p>
            </div>
          </button>

          <button
            type="button"
            onClick={openTiktok}
            className="contact-card is-clickable is-wide"
          >
            <div className="contact-icon tiktok">T</div>
            <div>
              <p className="contact-label">{t("contact.items.tiktok")}</p>
              <p className="contact-value">severus_jr</p>
            </div>
          </button>

          {/* เพิ่ม LINE: กดแล้วเปิด QR */}
          <button
            type="button"
            onClick={openLineQr}
            className="contact-card is-clickable"
          >
            <div className="contact-icon line">L</div>
            <div>
              <p className="contact-label">{t("contact.items.line")}</p>
              <p className="contact-value">สแกน QR เพื่อเพิ่มเพื่อน</p>
            </div>
          </button>
        </div>
      </section>

      {isLineQrOpen && (
        <div
          className="line-qr-backdrop"
          role="presentation"
          onClick={closeLineQr}
        >
          <div
            className="line-qr-modal"
            role="dialog"
            aria-modal="true"
            aria-label="LINE QR Code"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="line-qr-close"
              onClick={closeLineQr}
              aria-label="Close LINE QR"
            >
              ×
            </button>

            <div className="line-qr-header">
              <div className="contact-icon line">L</div>
              <div>
                <p className="line-qr-kicker">LINE</p>
                <h2 className="line-qr-title">สแกน QR เพื่อเพิ่มเพื่อน</h2>
              </div>
            </div>

            <div className="line-qr-frame">
              <img
                src={lineQrImage}
                alt="LINE QR Code"
                className="line-qr-image"
              />
            </div>

            <p className="line-qr-note">
              เปิดแอป LINE แล้วสแกน QR Code นี้เพื่อเพิ่มเพื่อนครับ
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Contact;