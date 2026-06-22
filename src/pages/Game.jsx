import { Link } from "react-router-dom";
import { FiArrowRight, FiEdit3, FiPlayCircle, FiTerminal } from "react-icons/fi";
import "./GameHub.css";

const games = [
  {
    to: "/game/snake",
    title: "Snake Game",
    badge: "React Logic",
    description: "เกมงูควบคุมด้วยปุ่มลูกศร พร้อมบันทึกคะแนนผ่าน Python FastAPI",
    icon: FiPlayCircle,
  },
  {
    to: "/game/quiz",
    title: "Quiz Game",
    badge: "FastAPI Quiz",
    description: "เกมตอบคำถาม Programming โดยให้ Backend ตรวจคำตอบและคำนวณคะแนน",
    icon: FiTerminal,
  },
  {
    to: "/game/typing",
    title: "Typing Speed",
    badge: "WPM Test",
    description: "เกมวัดความเร็วพิมพ์คำศัพท์ Programming พร้อมบันทึก WPM",
    icon: FiEdit3,
  },
];

function Game() {
  return (
    <section className="game-hub-page">
      <div className="game-hub-container">
        <div className="game-hub-hero">
          <span className="game-hub-badge">REACT + PYTHON FASTAPI</span>
          <h1>Mini Games Playground</h1>
          <p>
            รวมเกมขนาดเล็กสำหรับโชว์ทักษะ Frontend, Logic, REST API และ Backend ด้วย Python FastAPI
          </p>
        </div>

        <div className="game-hub-grid">
          {games.map(({ to, title, badge, description, icon: Icon }) => (
            <Link key={to} to={to} className="game-hub-card">
              <div className="game-hub-icon">
                <Icon />
              </div>

              <span>{badge}</span>
              <h2>{title}</h2>
              <p>{description}</p>

              <div className="game-hub-link">
                เล่นเกมนี้
                <FiArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Game;