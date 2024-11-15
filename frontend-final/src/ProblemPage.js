import React, { useState, useEffect } from 'react'; // Import React and hooks
import { useParams } from 'react-router-dom'; // Import hook for retrieving route parameters
import { Div, Text, Button } from 'atomize'; // Import Atomize components
import Editor from "@monaco-editor/react"; // Import Monaco Editor for code editing

const ProblemPage = ({ isDuelMode }) => {
    const { id } = useParams(); // Extract the problem ID from the route
    const [timeLeft, setTimeLeft] = useState(900); // Initialize timer for Duel mode (5 minutes)

    // Sample problem data (this should be replaced with actual data fetching logic)
    const problem = {
        title: "Two Sum",
        description: "Return indices of two numbers that add up to a target value in an array.",
        difficulty: "Easy",
    };

    useEffect(() => {
        // Timer logic: Countdown only in Duel mode
        if (isDuelMode && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000); // Decrease timer every second
            return () => clearInterval(timer); // Clean up the timer on unmount
        }
    }, [isDuelMode, timeLeft]); // Dependencies: isDuelMode and timeLeft

    const handleRunCode = () => {
        // Logic for running code (e.g., API call or local execution)
        console.log("Running code...");
    };

    return (
        <Div d="flex" flexDir="row" minH="100vh" p="2rem">
            
            {/* Left Side: Problem Details */}
            <Div w="50%" p="1rem" border="1px solid #e0e0e0" shadow="4" rounded="lg">
                <Text tag="h2" textSize="title" m={{ b: "1rem" }}>{problem.title}</Text> {/* Problem Title */}
                <Text textSize="body" textColor="gray700" m={{ b: "1rem" }}>{problem.description}</Text> {/* Problem Description */}
                <Text textSize="caption" textColor="gray500" m={{ b: "1rem" }}>Difficulty: {problem.difficulty}</Text> {/* Problem Difficulty */}
            </Div>

            {/* Right Side: Code Editor and Run Code Button */}
            <Div w="50%" p="3rem" d="flex" flexDir="column" align="center" border="1px solid #e0e0e0" shadow="4" rounded="lg" m={{ l: "5rem" }}>
                
                {/* Monaco Code Editor */}
                <Editor
                    height="625px"
                    width="85%"
                    defaultLanguage="java"
                    defaultValue="// Start coding here"
                    shadow="5"
                />

                {/* Run Code Section */}
                {isDuelMode ? (
                    <Div d="flex" justify="space-between" w="85%" m={{ t: "1rem" }}>
                        {/* Display Timer */}
                        <Text textSize="title" textColor="danger700">
                            Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                        </Text>
                        {/* Run Code Button */}
                        <Button
                            bg="info700"
                            hoverBg="info800"
                            textColor="white"
                            onClick={handleRunCode}
                        >
                            Run Code
                        </Button>
                    </Div>
                ) : (
                    /* Practice Mode Run Code Button */
                    <Button
                        bg="info700"
                        hoverBg="info800"
                        textColor="white"
                        onClick={handleRunCode}
                        m={{ t: "1rem" }}
                    >
                        Run Code
                    </Button>
                )}
            </Div>
        </Div>
    );
};

export default ProblemPage; // Export ProblemPage component