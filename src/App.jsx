import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import BackButton from "./components/BackButton";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "./responsive.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Game = lazy(() => import("./pages/Game"));
const SnakeGame = lazy(() => import("./pages/games/SnakeGame"));
const QuizGame = lazy(() => import("./pages/games/QuizGame"));
const TypingGame = lazy(() => import("./pages/games/TypingGame"));

function RouteScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <BrowserRouter>
      <RouteScrollManager />
      <a className="skip-link" href="#content">
        ข้ามไปยังเนื้อหา / Skip to content
      </a>
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={toggleMenu}
      />

      <div className="app-layout">
        <Sidebar
          isMenuOpen={isMenuOpen}
          onMenuClose={closeMenu}
        />

        <div className="main-content" id="content" tabIndex="-1">
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
