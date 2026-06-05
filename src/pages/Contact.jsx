function Contact() {
  const openFacebook = () => {
    window.open("https://www.facebook.com/Suttiphong%20Phongsraphang", "_blank", "noopener,noreferrer");
  };

  const openGithub = () => {
    window.open("https://github.com/sutthiphong-19", "_blank", "noopener,noreferrer");
  };

  return (
    <main className="contact-page">
      <section className="contact-shell">
        <p className="about-badge">Contact</p>
        <h1 className="contact-title">ติดต่อฉัน</h1>
        <p className="contact-note">
          ยินดีรับงานและพูดคุยทุกช่องทางครับ
        </p>

        <div className="contact-grid">
          <article className="contact-card">
            <div className="contact-icon email">E</div>
            <div>
              <p className="contact-label">Email</p>
              <p className="contact-value">suttiphong.p@kkumail.com</p>
            </div>
          </article>

          <article className="contact-card">
            <div className="contact-icon phone">P</div>
            <div>
              <p className="contact-label">Phone</p>
              <p className="contact-value">096-885-8683</p>
            </div>
          </article>

          <button type="button" onClick={openFacebook} className="contact-card is-clickable">
            <div className="contact-icon facebook">F</div>
            <div>
              <p className="contact-label">Facebook</p>
              <p className="contact-value">suttiphong phongsraphang</p>
            </div>
          </button>

          <button type="button" onClick={openGithub} className="contact-card is-clickable">
            <div className="contact-icon github">G</div>
            <div>
              <p className="contact-label">GitHub</p>
              <p className="contact-value">sutthiphong-19</p>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Contact;
