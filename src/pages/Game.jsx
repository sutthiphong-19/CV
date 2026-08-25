import { Link } from "react-router-dom";
import { FiArrowRight, FiEdit3, FiPlayCircle, FiTerminal } from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import "./GameHub.css";

const games = [
  {
    to: "/game/snake",
    key: "snake",
    icon: FiPlayCircle,
  },
  {
    to: "/game/quiz",
    key: "quiz",
    icon: FiTerminal,
  },
  {
    to: "/game/typing",
    key: "typing",
    icon: FiEdit3,
  },
];

function Game() {
  const { t } = useTranslation();

  return (
    <section className="game-hub-page">
      <div className="game-hub-container">
        <div className="game-hub-hero">
          <span className="game-hub-badge">
            {t("gameHub.badge", {
              defaultValue: "REACT + PYTHON FASTAPI",
            })}
          </span>
          <h1>
            {t("gameHub.title", {
              defaultValue: "Mini Games Playground",
            })}
          </h1>
          <p>
            {t("gameHub.description", {
              defaultValue:
                "รวมมินิเกมสำหรับโชว์ทักษะ Frontend, การเชื่อมต่อ REST API และการทำงานร่วมกับ Python FastAPI backend",
            })}
          </p>
        </div>

        <div className="game-hub-grid">
          {games.map(({ to, key, icon: Icon }) => (
            <Link key={to} to={to} className="game-hub-card">
              <div className="game-hub-icon">
                <Icon />
              </div>

              <span>
                {t(`gameHub.items.${key}.badge`, {
                  defaultValue:
                    key === "snake"
                      ? "React Logic"
                      : key === "quiz"
                        ? "FastAPI Quiz"
                        : "WPM Test",
                })}
              </span>
              <h2>
                {t(`gameHub.items.${key}.title`, {
                  defaultValue:
                    key === "snake"
                      ? "Snake Game"
                      : key === "quiz"
                        ? "Quiz Game"
                        : "Typing Speed",
                })}
              </h2>
              <p>
                {t(`gameHub.items.${key}.description`, {
                  defaultValue:
                    key === "snake"
                      ? "เกมงูควบคุมด้วยปุ่มทิศทาง พร้อมบันทึกคะแนนผ่าน Python FastAPI"
                      : key === "quiz"
                        ? "ตอบคำถาม Programming โดยให้ backend ตรวจคำตอบและคำนวณคะแนน"
                        : "วัดความเร็วพิมพ์คำศัพท์ Programming พร้อมบันทึกผล WPM ไปยัง leaderboard",
                })}
              </p>

              <div className="game-hub-link">
                {t("gameHub.play", {
                  defaultValue: "เล่นเกมนี้",
                })}
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
