import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./SnakeGame.css";

const API_URL = import.meta.env.VITE_GAME_API_URL || "http://localhost:8000";

const BOARD_SIZE = 20;
const SPEED_MS = 120;
const POINT_PER_FOOD = 10;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function createInitialSnake() {
  const center = Math.floor(BOARD_SIZE / 2);

  return [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];
}

function isSamePosition(a, b) {
  return a.x === b.x && a.y === b.y;
}

function generateFood(snake) {
  while (true) {
    const food = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };

    const isOnSnake = snake.some((part) => isSamePosition(part, food));

    if (!isOnSnake) {
      return food;
    }
  }
}

export default function Game() {
  const initialSnake = useMemo(() => createInitialSnake(), []);

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(() => generateFood(initialSnake));
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem("snake-player-name") || "Thanakorn";
  });

  const snakeRef = useRef(snake);
  const foodRef = useRef(food);
  const scoreRef = useRef(score);
  const statusRef = useRef(status);
  const directionRef = useRef(DIRECTIONS.RIGHT);
  const nextDirectionRef = useRef(DIRECTIONS.RIGHT);
  const submittedRef = useRef(false);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const fetchLeaderboard = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/snake/scores`);
      const data = await response.json();
      setLeaderboard(Array.isArray(data) ? data : []);
    } catch (error) {
      setLeaderboard([]);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const saveScore = useCallback(async () => {
    if (submittedRef.current) return;

    submittedRef.current = true;

    try {
      await fetch(`${API_URL}/snake/scores`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName || "Player",
          score: scoreRef.current,
        }),
      });

      fetchLeaderboard();
    } catch (error) {
      console.error("Save score failed", error);
    }
  }, [fetchLeaderboard, playerName]);

  const finishGame = useCallback(() => {
    statusRef.current = "gameover";
    setStatus("gameover");
    saveScore();
  }, [saveScore]);

  const changeDirection = useCallback((nextDirection) => {
    const currentDirection = directionRef.current;

    const isOppositeDirection =
      currentDirection.x + nextDirection.x === 0 &&
      currentDirection.y + nextDirection.y === 0;

    if (isOppositeDirection) return;

    nextDirectionRef.current = nextDirection;
  }, []);

  const startGame = useCallback(() => {
    const newSnake = createInitialSnake();
    const newFood = generateFood(newSnake);

    snakeRef.current = newSnake;
    foodRef.current = newFood;
    scoreRef.current = 0;
    directionRef.current = DIRECTIONS.RIGHT;
    nextDirectionRef.current = DIRECTIONS.RIGHT;
    submittedRef.current = false;

    setSnake(newSnake);
    setFood(newFood);
    setScore(0);
    setStatus("running");

    localStorage.setItem("snake-player-name", playerName || "Player");
  }, [playerName]);

  const togglePause = () => {
    if (status === "running") {
      setStatus("paused");
      return;
    }

    if (status === "paused") {
      setStatus("running");
    }
  };

  const moveSnake = useCallback(() => {
    if (statusRef.current !== "running") return;

    const currentSnake = snakeRef.current;
    const currentFood = foodRef.current;

    directionRef.current = nextDirectionRef.current;

    const head = currentSnake[0];
    const nextHead = {
      x: head.x + directionRef.current.x,
      y: head.y + directionRef.current.y,
    };

    const hitWall =
      nextHead.x < 0 ||
      nextHead.x >= BOARD_SIZE ||
      nextHead.y < 0 ||
      nextHead.y >= BOARD_SIZE;

    if (hitWall) {
      finishGame();
      return;
    }

    const hitSelf = currentSnake.some((part) => isSamePosition(part, nextHead));

    if (hitSelf) {
      finishGame();
      return;
    }

    const didEatFood = isSamePosition(nextHead, currentFood);
    const nextSnake = [nextHead, ...currentSnake];

    if (didEatFood) {
      const nextScore = scoreRef.current + POINT_PER_FOOD;
      const nextFood = generateFood(nextSnake);

      scoreRef.current = nextScore;
      foodRef.current = nextFood;

      setScore(nextScore);
      setFood(nextFood);
    } else {
      nextSnake.pop();
    }

    snakeRef.current = nextSnake;
    setSnake(nextSnake);
  }, [finishGame]);

  useEffect(() => {
    if (status !== "running") return;

    const timer = setInterval(moveSnake, SPEED_MS);

    return () => {
      clearInterval(timer);
    };
  }, [moveSnake, status]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (key === "arrowup" || key === "w") {
        event.preventDefault();
        changeDirection(DIRECTIONS.UP);
      }

      if (key === "arrowdown" || key === "s") {
        event.preventDefault();
        changeDirection(DIRECTIONS.DOWN);
      }

      if (key === "arrowleft" || key === "a") {
        event.preventDefault();
        changeDirection(DIRECTIONS.LEFT);
      }

      if (key === "arrowright" || key === "d") {
        event.preventDefault();
        changeDirection(DIRECTIONS.RIGHT);
      }

      if (key === " ") {
        event.preventDefault();

        if (statusRef.current === "idle" || statusRef.current === "gameover") {
          startGame();
        } else {
          setStatus((prev) => (prev === "running" ? "paused" : "running"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeDirection, startGame]);

  const cellMap = useMemo(() => {
    const map = new Map();

    snake.forEach((part, index) => {
      map.set(`${part.x}-${part.y}`, index === 0 ? "head" : "snake");
    });

    map.set(`${food.x}-${food.y}`, "food");

    return map;
  }, [food, snake]);

  const cells = useMemo(() => {
    return Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
      const x = index % BOARD_SIZE;
      const y = Math.floor(index / BOARD_SIZE);
      const type = cellMap.get(`${x}-${y}`);

      return {
        id: `${x}-${y}`,
        type,
      };
    });
  }, [cellMap]);

  return (
    <section className="snake-page">
      <div className="snake-layout">
        <div className="snake-card snake-main-card">
          <div className="snake-top">
            <div>
              <span className="snake-badge">MINI GAME</span>
              <h1>Snake Game</h1>
              <p>เกมงูด้วย React และบันทึกคะแนนผ่าน Python FastAPI</p>
            </div>

            <div className="snake-score">
              <span>Score</span>
              <strong>{score}</strong>
            </div>
          </div>

          <div className="snake-player-row">
            <label>
              Player Name
              <input
                value={playerName}
                maxLength={20}
                onChange={(event) => setPlayerName(event.target.value)}
                placeholder="Player"
              />
            </label>

            <div className={`snake-status ${status}`}>
              {status === "idle" && "Ready"}
              {status === "running" && "Running"}
              {status === "paused" && "Paused"}
              {status === "gameover" && "Game Over"}
            </div>
          </div>

          <div
            className="snake-board"
            style={{
              gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            }}
          >
            {cells.map((cell) => (
              <div
                key={cell.id}
                className={`snake-cell ${cell.type ? `is-${cell.type}` : ""}`}
              />
            ))}
          </div>

          <div className="snake-actions">
            {(status === "idle" || status === "gameover") && (
              <button className="snake-primary-btn" onClick={startGame}>
                {status === "gameover" ? "เล่นอีกครั้ง" : "เริ่มเกม"}
              </button>
            )}

            {(status === "running" || status === "paused") && (
              <button className="snake-secondary-btn" onClick={togglePause}>
                {status === "running" ? "หยุดชั่วคราว" : "เล่นต่อ"}
              </button>
            )}
          </div>

          <div className="snake-mobile-controls">
            <button onClick={() => changeDirection(DIRECTIONS.UP)}>↑</button>
            <div>
              <button onClick={() => changeDirection(DIRECTIONS.LEFT)}>←</button>
              <button onClick={() => changeDirection(DIRECTIONS.DOWN)}>↓</button>
              <button onClick={() => changeDirection(DIRECTIONS.RIGHT)}>→</button>
            </div>
          </div>

          <p className="snake-hint">
            ใช้ปุ่มลูกศร เพื่อควบคุม และกด Space เพื่อเริ่ม/พักเกม
          </p>
        </div>

        <aside className="snake-card snake-rank-card">
          <span className="snake-badge blue">LEADERBOARD</span>
          <h2>Top Scores</h2>

          <div className="snake-rank-list">
            {leaderboard.length ? (
              leaderboard.map((item, index) => (
                <div className="snake-rank-item" key={`${item.name}-${item.created_at}`}>
                  <span>#{index + 1}</span>
                  <strong>{item.name}</strong>
                  <b>{item.score}</b>
                </div>
              ))
            ) : (
              <p className="snake-empty">ยังไม่มีคะแนน</p>
            )}
            
          </div>
        </aside>
      </div>
    </section>
  );
}
