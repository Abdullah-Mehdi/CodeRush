import React from 'react'; // Import React library
import { Div, Text, Anchor, Button } from 'atomize'; // Import Atomize components
import { Link } from 'react-router-dom'; // Import Link for navigation

// Mock data for problems (to be replaced with API or database fetch)
const mockProblems = [
    { id: 1, title: "Two Sum", description: "Return indices of two numbers that add up to a target value in an array.", difficulty: "Easy" },
    { id: 2, title: "Longest Common Prefix", description: "Find the longest common prefix string in an array of strings.", difficulty: "Easy" },
    { id: 3, title: "Palindrome Number", description: "Determine if a given integer is a palindrome.", difficulty: "Easy" },
    { id: 4, title: "Add Two Numbers", description: "Add two linked lists representing numbers and return the sum as a linked list.", difficulty: "Medium" },
    { id: 5, title: "Longest Palindromic Substring", description: "Return the longest palindromic substring in a given string.", difficulty: "Medium" },
    { id: 6, title: "Longest Substring Without Repeating Characters", description: "Find the length of the longest substring without repeating characters.", difficulty: "Medium" },
    { id: 7, title: "Median of Two Sorted Arrays", description: "Find the median of two sorted arrays.", difficulty: "Hard" },
    { id: 8, title: "Regular Expression Matching", description: "Implement regex matching with '.' and '*' for a given pattern and string.", difficulty: "Hard" },
];

function ProblemLibrary() {
    return (
        <Div d="flex" flexDir="column" minH="100vh">
            
            {/* Header and Navigation */}
            <Div d="flex" justify="space-between" align="center" p="2rem" bg="white">
                <Text textSize="title" textColor="black" m={{ l: "1rem" }}>CodeRush</Text>
                <Div d="flex">
                    <Link to="/" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Home</Link>
                    <Link to="/problem-library" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Problem Library</Link>
                    <Link to="/login-signup" style={{ color: 'black', marginRight: '1.5rem', textDecoration: 'none' }}>Login or Signup</Link>
                </Div>
            </Div>

            {/* Main Content Section */}
            <Div d="flex" flexDir="column" align="center" justify="center" p="3rem" flexGrow="1">
                <Text tag="h1" textSize="display2" m={{ b: "1rem" }}>Problem Library</Text>
                <Text textSize="subheader" textAlign="center" m={{ b: "-1rem" }} maxW="30rem">
                    Browse and solve a wide range of coding problems to sharpen your skills.
                </Text>
            </Div>

            {/* Problem Cards */}
            {mockProblems.map((problem) => (
                <Div
                    key={problem.id}
                    p="2rem"
                    shadow="3"
                    rounded="lg"
                    w="100%"
                    maxW="500px" // Set max width for each card
                    minH="200px" // Ensure consistent height
                    m={{ b: "1rem", x: "auto" }} // Center each card horizontally
                    d="flex"
                    flexDir="column"
                    align="center"
                >
                    <Text tag="h2" textSize="title" m={{ b: "0.5rem" }}>{problem.title}</Text>
                    <Text textSize="body" textColor="gray700" m={{ b: "0.5rem" }} textAlign="center">
                        {problem.description}
                    </Text>
                    <Text textSize="caption" textColor="gray500" m={{ b: "1rem" }}>Difficulty: {problem.difficulty}</Text>

                    {/* Mode Selection Buttons */}
                    <Div d="flex" justify="space-between" w="100%">
                        <Link to={`/practice-mode/${problem.id}`} style={{ textDecoration: 'none' }}>
                            <Button bg="info700" hoverBg="info800" textColor="white" w="100px">Practice</Button>
                        </Link>
                        <Link to={`/duel/${problem.id}`} style={{ textDecoration: 'none' }}>
                            <Button bg="warning700" hoverBg="warning800" textColor="white" w="100px">Duel</Button>
                        </Link>
                    </Div>
                </Div>
            ))}

            {/* Footer */}
            <Div bg="gray100" p="3rem" d="flex" justify="space-between">
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Coderush</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Features</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Setup</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Development</Anchor>
                </Div>
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Resources</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Learn Java</Anchor>
                </Div>
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>About</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Our Team</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Contact</Anchor>
                </Div>
                <Div d="flex" flexDir="column" m={{ r: "3rem", b: "2rem" }}>
                    <Text textSize="title" m={{ b: "1rem" }}>Extras</Text>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Help</Anchor>
                    <Anchor href="/" textColor="black" m={{ b: "0.5rem" }}>Feedback</Anchor>
                </Div>
            </Div>

            {/* Footer Bottom */}
            <Div bg="gray100" d="flex" justify="center" p="1rem">
                <Text textSize="body" textColor="gray800">Designed & Developed by Team 6</Text>
            </Div>
        </Div>
    );
}

export default ProblemLibrary; // Export ProblemLibrary component