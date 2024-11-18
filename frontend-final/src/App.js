import React from 'react'; // Importing React library for building components
import { Helmet } from 'react-helmet'; // Importing Helmet for managing document head
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing Router components for navigation
import LandingPage from './LandingPage'; // Landing page component
import ProblemLibrary from './ProblemLibrary'; // Problem library component
import PracticeMode from './PracticeMode'; // Practice mode component
import Duel from './Duel'; // Duel mode component
import LoginSignup from './LoginSignup'; // Login/Signup component
import './index.css'; // Importing global CSS styles

function App() {
  return (
    <Router> {/* Wrap the app in a Router for navigation */}
        <Helmet>
        <title>CodeRush</title>
        </Helmet>
      <Routes> {/* Define all app routes */}
        <Route path="/" element={<LandingPage />} /> {/* Home/Landing page route */}
        <Route path="/problem-library" element={<ProblemLibrary />} /> {/* Problem Library route */}
        <Route path="/practice-mode/:id" element={<PracticeMode />} /> {/* Practice Mode route with dynamic ID */}
        <Route path="/duel/:id" element={<Duel />} /> {/* Duel Mode route with dynamic ID */}
        <Route path="/login-signup" element={<LoginSignup />} /> {/* Login and Signup page route */}
      </Routes>
    </Router>
  );
}

export default App; // Export App component as default