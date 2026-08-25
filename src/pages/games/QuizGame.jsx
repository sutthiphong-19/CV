import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildApiUrl } from "../../config/api";
import "./MiniGames.css";

function QuizGame() {
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [playerName, setPlayerName] = useState(
    () => localStorage.getItem("game-player-name") || "Thanakorn"
  );
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("playing");
  const [message, setMessage] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const answerTimerRef = useRef(null);

  const currentQuestion = useMemo(() => {
    return questions[currentIndex] || null;
  }, [questions, currentIndex]);

  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  const fetchQuestions = useCallback(async () => {
    const response = await fetch(buildApiUrl("/quiz/questions"));
    const data = await response.json();
    setQuestions(Array.isArray(data) ? data : []);
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    const response = await fetch(buildApiUrl("/quiz/scores"));
    const data = await response.json();
    setLeaderboard(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchQuestions();
      void fetchLeaderboard();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchLeaderboard, fetchQuestions]);

  useEffect(() => {
    return () => {
      if (answerTimerRef.current) {
        window.clearTimeout(answerTimerRef.current);
      }
    };
  }, []);

  const saveScore = useCallback(
    async (finalScore) => {
      await fetch(buildApiUrl("/quiz/scores"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName || "Player",
          score: finalScore,
        }),
      });

      await fetchLeaderboard();
    },
    [fetchLeaderboard, playerName]
  );

  const handleAnswer = async () => {
    if (!selectedAnswer || !currentQuestion || isChecking) {
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch(buildApiUrl("/quiz/check-answer"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_id: currentQuestion.id,
          answer: selectedAnswer,
        }),
      });

      const result = await response.json();
      const nextScore = result.correct ? score + result.score : score;

      setMessage(result.message);

      if (result.correct) {
        setScore(nextScore);
      }

      answerTimerRef.current = window.setTimeout(() => {
        const isLast = currentIndex >= questions.length - 1;

        if (isLast) {
          setStatus("finished");
          void saveScore(nextScore);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer("");
          setMessage("");
        }

        setIsChecking(false);
      }, 800);
    } catch {
      setMessage("เชื่อมต่อ Backend ไม่สำเร็จ");
      setIsChecking(false);
    }
  };

  const restartGame = () => {
    localStorage.setItem("game-player-name", playerName || "Player");
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setStatus("playing");
    setMessage("");
  };

  return (
    <section className="mini-game-page">
      <div className="mini-game-layout">
        <main className="mini-game-card">
          <div className="mini-game-top">
            <div>
              <span className="mini-badge">QUIZ GAME</span>
              <h1>Programming Quiz</h1>
              <p>ตอบคำถาม Programming โดยให้ FastAPI ตรวจคำตอบและบันทึกคะแนน</p>
            </div>

            <div className="mini-score-box">
              <span>Score</span>
              <strong>{score}</strong>
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

          {status === "finished" ? (
            <div className="mini-result-box">
              <span className="mini-badge success">FINISHED</span>
              <h2>จบเกมแล้ว</h2>
              <p>คะแนนรวมของคุณคือ</p>
              <strong>{score}</strong>

              <button className="mini-primary-btn" onClick={restartGame}>
                เล่นอีกครั้ง
              </button>
            </div>
          ) : (
            <>
              <div className="mini-progress">
                <div style={{ width: `${progress}%` }} />
              </div>

              {currentQuestion ? (
                <>
                  <div className="mini-question-head">
                    <span>
                      Question {currentIndex + 1} / {questions.length}
                    </span>
                    <h2>{currentQuestion.question}</h2>
                  </div>

                  <div className="mini-choice-grid">
                    {currentQuestion.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        className={selectedAnswer === choice ? "mini-choice active" : "mini-choice"}
                        onClick={() => setSelectedAnswer(choice)}
                        disabled={isChecking}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>

                  {message && <p className="mini-message">{message}</p>}

                  <button
                    className="mini-primary-btn"
                    onClick={handleAnswer}
                    disabled={!selectedAnswer || isChecking}
                  >
                    {isChecking ? "กำลังตรวจคำตอบ..." : "ตอบคำถาม"}
                  </button>
                </>
              ) : (
                <p className="mini-muted">กำลังโหลดคำถาม...</p>
              )}
            </>
          )}
        </main>

        <aside className="mini-game-card mini-rank-card">
          <span className="mini-badge blue">LEADERBOARD</span>
          <h2>Quiz Scores</h2>

          <div className="mini-rank-list">
            {leaderboard.length ? (
              leaderboard.map((item, index) => (
                <div className="mini-rank-item" key={`${item.name}-${item.created_at}`}>
                  <span>#{index + 1}</span>
                  <strong>{item.name}</strong>
                  <b>{item.score}</b>
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

export default QuizGame;
