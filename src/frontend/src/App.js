import React, { useEffect } from "react";
import M from "materialize-css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Funders from "./components/Funders";
import Team from "./components/Team";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    // Materialize 컴포넌트 초기화 (컴포넌트 mount 시 한 번 실행)
    M.AutoInit();
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/funders" element={<Funders />} />
          <Route path="/team" element={<Team />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
