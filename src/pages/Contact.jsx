import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaFacebookF, FaGithub, FaTiktok } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import lineQrImage from "../assets/line-qr.jpg";
import { useTranslation } from "../hooks/useTranslation";

const contactItems = [
  {
    key: "email",
    value: "suttiphong.p@kkumail.com",
    href: "mailto:suttiphong.p@kkumail.com",
    icon: FiMail,
    className: "email",
  },
  {
    key: "phone",
    value: "096-885-8683",
    href: "tel:0968858683",
    icon: FiPhone,
    className: "phone",
  },
  {
    key: "facebook",
    value: "suttiphong phongsraphang",
    href: "https://www.facebook.com/suttipong.pongsapang",
    icon: FaFacebookF,
    className: "facebook",
  },
  {
    key: "github",
    value: "sutthiphong-19",
    href: "https://github.com/sutthiphong-19",
    icon: FaGithub,
    className: "github",
  },
  {
    key: "tiktok",
    value: "severus_jr",
    href: "https://www.tiktok.com/@severus_jr",
    icon: FaTiktok,
    className: "tiktok",
    wide: true,
  },
];

function Contact() {
  const { t } = useTranslation();
  const [isLineQrOpen, setIsLineQrOpen] = useState(false);

  return (
    <main className="contact-page">
      <section className="contact-shell">
        <p className="about-badge">{t("contact.badge")}</p>
        <h1 className="contact-title">{t("contact.title")}</h1>
        <p className="contact-note">{t("contact.note")}</p>

        <div className="contact-grid">
          {contactItems.map(({ key, value, href, icon: Icon, className, wide }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className={`contact-card is-clickable${wide ? " is-wide" : ""}`}
            >
              <div className={`contact-icon ${className}`}>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p className="contact-label">{t(`contact.items.${key}`)}</p>
                <p className="contact-value">{value}</p>
              </div>
            </a>
          ))}

          <button
            type="button"
            onClick={() => setIsLineQrOpen(true)}
            className="contact-card is-clickable"
          >
            <div className="contact-icon line">
              <SiLine aria-hidden="true" />
            </div>
            <div>
              <p className="contact-label">{t("contact.items.line")}</p>
              <p className="contact-value">{t("contact.lineQr.summary")}</p>
            </div>
          </button>
        </div>
      </section>

      {isLineQrOpen && (
        <div
          className="line-qr-backdrop"
          role="presentation"
          onClick={() => setIsLineQrOpen(false)}
        >
          <div
            className="line-qr-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t("contact.lineQr.aria")}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="line-qr-close"
              onClick={() => setIsLineQrOpen(false)}
              aria-label={t("contact.lineQr.close")}
            >
              x
            </button>

            <div className="line-qr-header">
              <div className="contact-icon line">
                <SiLine aria-hidden="true" />
              </div>
              <div>
                <p className="line-qr-kicker">LINE</p>
                <h2 className="line-qr-title">{t("contact.lineQr.title")}</h2>
              </div>
            </div>

            <div className="line-qr-frame">
              <img
                src={lineQrImage}
                alt={t("contact.lineQr.aria")}
                className="line-qr-image"
              />
            </div>

            <p className="line-qr-note">{t("contact.lineQr.note")}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default Contact;
