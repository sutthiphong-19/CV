function Contact() {
  const cardStyle = {
    display: "flex", alignItems: "center", gap: 14,
    border: "1px solid #e5e7eb", borderRadius: 12,
    padding: "14px 18px", background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  };

  const iconStyle = (bg) => ({
    width: 42, height: 42, borderRadius: "50%",
    background: bg, display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: 20, flexShrink: 0,
  });

  const labelStyle = { margin: 0, fontSize: 12, color: "#9ca3af" };
  const valueStyle = { margin: 0, fontSize: 15, color: "#111827", fontWeight: 500 };

  const openFacebook = () => {
    window.open("https://www.facebook.com/Suttiphong Phongsraphang", "_blank");
  };
  const openGithub = () => {
    window.open("https://github.com/sutthiphong-19", "_blank");
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "2rem 1rem", fontFamily: "sans-serif" }}>

      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: "1.5rem", color: "#111827" }}>
        ติดต่อฉัน
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

        <div style={cardStyle}>
          <div style={iconStyle("#eef2ff")}>📧</div>
          <div>
            <p style={labelStyle}>อีเมล</p>
            <p style={valueStyle}>suttiphong1b@email.com</p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={iconStyle("#f0fdf4")}>📞</div>
          <div>
            <p style={labelStyle}>โทรศัพท์</p>
            <p style={valueStyle}>096-885-8683</p>
          </div>
        </div>

        <div
          onClick={openFacebook}
          style={{ ...cardStyle, cursor: "pointer" }}
        >
          <div style={iconStyle("#eff6ff")}>👤</div>
          <div>
            <p style={labelStyle}>Facebook</p>
            <p style={{ ...valueStyle, color: "#4f46e5" }}>suttiphong phongsraphang</p>
          </div>
        </div>
         {/* GitHub — */}
        <div onClick={openGithub} style={{ ...cardStyle, cursor: "pointer" }}>
          <div style={iconStyle("#f3f4f6")}>🐱</div>
          <div>
            <p style={labelStyle}>GitHub</p>
            <p style={{ ...valueStyle, color: "#4f46e5" }}>sutthiphong-19</p>
          </div>
        </div>

      </div>

      <p style={{ marginTop: "1.5rem", fontSize: 13, color: "#9ca3af", textAlign: "center" }}>
        ยินดีรับงานและพูดคุยทุกช่องทางครับ
      </p>
    </div>
  );
}

export default Contact;