import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProblemLibrary from './ProblemLibrary';
import PracticeMode from './PracticeMode';
import Duel from './Duel';
import LoginSignup from './LoginSignup';
import './index.css';
import Profile from './Profile';

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
        <Route path="/practice-mode/:id" element={<PracticeMode />} />
        <Route path="/duel/:id" element={<Duel />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
