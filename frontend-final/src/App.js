import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProblemLibrary from './ProblemLibrary';
import PracticeMode from './PracticeMode';
import Leaderboard from './Leaderboard';
import Duel from './Duel';
import LoginSignup from './LoginSignup';
import './index.css';

function App() {
  // Add this useEffect hook to set the document title
  useEffect(() => {
    document.title = '\u{1F4BB} CodeRush';  // Unicode for computer emoji
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/problem-library" element={<ProblemLibrary />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/practice-mode/:id" element={<PracticeMode />} />
        <Route path="/duel/:id" element={<Duel />} />
        <Route path="/login-signup" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
