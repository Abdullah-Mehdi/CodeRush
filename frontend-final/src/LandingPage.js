import React from 'react';
import { Div, Text, Button } from 'atomize';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Div d="flex" flexDir="column" minH="100vh">
      {/* Header and Navigation */}
      <Div
        d="flex"
        justify="space-between"
        align="center"
        p="2rem"
        bg="white"
      >
        {/* Logo */}
        <Text textSize="title" textColor="black" m={{ l: "1rem" }}>
          CodeRush
        </Text>

        {/* Navigation Links */}
        <Div d="flex">
          <Link to="/" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/problem-library" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
            Problem Library
          </Link>
          <Link to="/practice-mode" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
            Practice Mode
          </Link>
          <Link to="/duel" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
            Duel
          </Link>
          <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>
            Login or Signup
          </Link>
        </Div>
      </Div>

      {/* Main Content Section */}
      <Div d="flex" flexDir="column" align="center" justify="center" p="3rem" flexGrow="1">
        {/* Title */}
        <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>
          Welcome to CodeRush
        </Text>

        {/* Description */}
        <Text textSize="subheader" textAlign="center" m={{ b: "2rem" }} maxW="30rem">
          CodeRush is a platform where developers can test their coding skills in real-time duels, preparing for coding interviews the fun way.
        </Text>

        {/* Get Started Button */}
        <Button
          bg="info700"
          hoverBg="info800"
          textColor="white"
          p={{ x: "2rem", y: "0.75rem" }}
          rounded="md"
        >
          Let’s Duel
        </Button>
      </Div>

      {/* Footer - - - // - - - */}
      <Div bg="gray100" p="3rem" d="flex" justify="space-between">
        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Features</Link>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Setup</Link>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Development</Link>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Learn Java</Link>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>About</Text>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Our Team</Link>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Contact</Link>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Help</Link>
          <Link to="/" style={{ color: 'black', marginBottom: '0.5rem', textDecoration: 'none' }}>Feedback</Link>
        </Div>
      </Div>

      <Div bg="gray100" d="flex" justify="center" p="1rem">
        <Text textSize="body" textColor="gray800">
          Designed & Developed by Team 6
        </Text>
      </Div>
    </Div>
  );
}

export default LandingPage;
