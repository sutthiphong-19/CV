import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BackButton from "./components/BackButton";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Game = lazy(() => import("./pages/Game"));
const SnakeGame = lazy(() => import("./pages/games/SnakeGame"));
const QuizGame = lazy(() => import("./pages/games/QuizGame"));
const TypingGame = lazy(() => import("./pages/games/TypingGame"));

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app-layout">
        <Sidebar />

        <div className="main-content" id="content">
          <BackButton />

          <Suspense fallback={<div className="page-loading">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/portfolio/:section" element={<Portfolio />} />
              <Route path="/game" element={<Game />} />
              <Route path="/game/snake" element={<SnakeGame />} />
              <Route path="/game/quiz" element={<QuizGame />} />
              <Route path="/game/typing" element={<TypingGame />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
