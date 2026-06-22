import { useEffect, useMemo, useRef, useState } from "react";
import "./MiniGames.css";

const API_URL = import.meta.env.VITE_GAME_API_URL || "http://localhost:8000";

function shuffleWords(words) {
  return [...words].sort(() => Math.random() - 0.5);
}

function TypingGame() {
  const [words, setWords] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("game-player-name") || "Thanakorn"
  );
  const [input, setInput] = useState("");
  const [typedWords, setTypedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [duration, setDuration] = useState(60);
  const [status, setStatus] = useState("idle");

  const inputRef = useRef(null);
  const submittedRef = useRef(false);

  const currentWord = words[currentIndex] || "";

  const correctWords = useMemo(() => {
    return typedWords.filter((item) => item.correct).length;
  }, [typedWords]);

  const totalTyped = typedWords.length;

  const accuracy = useMemo(() => {
    if (!totalTyped) return 100;
    return Math.round((correctWords / totalTyped) * 100);
  }, [correctWords, totalTyped]);

  const wpm = useMemo(() => {
    const usedSeconds = duration - timeLeft;
    if (usedSeconds <= 0) return 0;
    return Math.round((correctWords / usedSeconds) * 60);
  }, [correctWords, duration, timeLeft]);

  const score = useMemo(() => {
    return Math.max(0, wpm * 10 + accuracy);
  }, [accuracy, wpm]);

  const fetchWords = async () => {
    const response = await fetch(`${API_URL}/typing/words`);
    const data = await response.json();

    setWords(shuffleWords(data.words || []));
    setDuration(data.duration || 60);
    setTimeLeft(data.duration || 60);
  };

  const fetchLeaderboard = async () => {
    const response = await fetch(`${API_URL}/typing/scores`);
    const data = await response.json();
    setLeaderboard(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchWords();
    fetchLeaderboard();
  }, []);

  const saveScore = async () => {
    if (submittedRef.current) return;

    submittedRef.current = true;

    await fetch(`${API_URL}/typing/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: playerName || "Player",
        wpm,
        accuracy,
        score,
      }),
    });

    fetchLeaderboard();
  };

  useEffect(() => {
    if (status !== "running") return;

    if (timeLeft <= 0) {
      setStatus("finished");
      saveScore();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, timeLeft]);

  useEffect(() => {
    if (status === "finished") {
      saveScore();
    }
  }, [status]);

  const startGame = () => {
    localStorage.setItem("game-player-name", playerName || "Player");
    submittedRef.current = false;
    setInput("");
    setTypedWords([]);
    setCurrentIndex(0);
    setTimeLeft(duration);
    setStatus("running");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const restartGame = async () => {
    await fetchWords();
    startGame();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (status !== "running") return;

    if (value.endsWith(" ")) {
      const typed = value.trim();
      const target = currentWord;

      if (typed) {
        setTypedWords((prev) => [
          ...prev,
          {
            typed,
            target,
            correct: typed === target,
          },
        ]);

        setCurrentIndex((prev) => {
          const next = prev + 1;

          if (next >= words.length - 1) {
            setWords((current) => [...current, ...shuffleWords(current)]);
          }

          return next;
        });
      }

      setInput("");
      return;
    }

    setInput(value);
  };

  return (
    <section className="mini-game-page">
      <div className="mini-game-layout">
        <main className="mini-game-card">
          <div className="mini-game-top">
            <div>
              <span className="mini-badge">TYPING GAME</span>
              <h1>Typing Speed</h1>
              <p>วัดความเร็วพิมพ์คำศัพท์ Programming พร้อมบันทึก WPM ผ่าน FastAPI</p>
            </div>

            <div className="mini-score-box">
              <span>WPM</span>
              <strong>{wpm}</strong>
            </div>
          </div>

          <label className="mini-input-label">
            Player Name
            <input
              value={playerName}
              maxLength={20}
              onChange={(event) => setPlayerName(event.target.value)}
            />
          </label>

          <div className="typing-stat-grid">
            <div>
              <span>Time</span>
              <strong>{timeLeft}s</strong>
            </div>
            <div>
              <span>Accuracy</span>
              <strong>{accuracy}%</strong>
            </div>
            <div>
              <span>Correct</span>
              <strong>{correctWords}</strong>
            </div>
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
          </div>

          {status === "finished" ? (
            <div className="mini-result-box">
              <span className="mini-badge success">FINISHED</span>
              <h2>หมดเวลาแล้ว</h2>
              <p>
                WPM: {wpm} / Accuracy: {accuracy}%
              </p>
              <strong>{score}</strong>

              <button className="mini-primary-btn" onClick={restartGame}>
                เล่นอีกครั้ง
              </button>
            </div>
          ) : (
            <>
              <div className="typing-word-box">
                {words.slice(currentIndex, currentIndex + 24).map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    className={index === 0 ? "current" : ""}
                  >
                    {word}
                  </span>
                ))}
              </div>

              <input
                ref={inputRef}
                className="typing-input"
                value={input}
                onChange={handleInputChange}
                placeholder="พิมพ์คำแล้วกด Space..."
                disabled={status !== "running"}
              />

              <div className="mini-actions">
                {status === "idle" ? (
                  <button className="mini-primary-btn" onClick={startGame}>
                    เริ่มเกม
                  </button>
                ) : (
                  <button className="mini-secondary-btn" onClick={() => setStatus("finished")}>
                    จบเกม
                  </button>
                )}
              </div>
            </>
          )}
        </main>

        <aside className="mini-game-card mini-rank-card">
          <span className="mini-badge blue">LEADERBOARD</span>
          <h2>Typing Scores</h2>

          <div className="mini-rank-list">
            {leaderboard.length ? (
              leaderboard.map((item, index) => (
                <div className="mini-rank-item" key={`${item.name}-${item.created_at}`}>
                  <span>#{index + 1}</span>
                  <strong>{item.name}</strong>
                  <b>{item.wpm} WPM</b>
                </div>
              ))
            ) : (
              <p className="mini-muted">ยังไม่มีคะแนน</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default TypingGame;