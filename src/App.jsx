import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Portfolio from "./pages/Portfolio";
import BackButton from "./components/BackButton";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="app-layout">
        <Sidebar />

        <div className="main-content" id="content">
          <BackButton />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio/:section" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
