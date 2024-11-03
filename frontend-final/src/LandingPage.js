import React from 'react';
import { Div, Text, Button, Anchor } from 'atomize';

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
          <Anchor href="/" textColor="black" m={{ r: "1.5rem" }}>
            Home
          </Anchor>
          <Anchor href="/" textColor="black" m={{ r: "1.5rem" }}>
            Problem Library
          </Anchor>
          <Anchor href="/" textColor="black" m={{ r: "1.5rem" }}>
            Practice Mode
          </Anchor>
          <Anchor href="/github" textColor="black" m={{ r: "1.5rem" }}>
            Duel
          </Anchor>
          <Anchor href="/designers" textColor="black" m={{ r: "1.5rem" }}>
            Login or Signup
          </Anchor>
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

      {/* Footer */}
      <Div bg="gray100" p="3rem" d="flex" justify="space-between">
        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Features</Anchor>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Setup</Anchor>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Development</Anchor>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Learn Java</Anchor>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>About</Text>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Our Team</Anchor>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Contact</Anchor>
        </Div>

        <Div d="flex" flexDir="column" align="flex-start" m={{ r: "3rem", b: "2rem" }}>
          <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Help</Anchor>
          <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Feedback</Anchor>
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
