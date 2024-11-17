import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Div, Text, Button } from 'atomize';
import Editor from "@monaco-editor/react"; 
import axiosInstance from './axiosConfig'; // Import Axios instance for API calls

const ProblemPage = ({ isDuelMode }) => {
  const { id } = useParams(); // Extract problem ID from route
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [language, setLanguage] = useState('java'); // Default language set to Java
  const [timeLeft, setTimeLeft] = useState(900); // Initialize timer (15 minutes = 900 seconds)

  // Timer logic: Countdown only in Duel mode
  useEffect(() => {
    if (isDuelMode && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000); // Decrease timer every second
      return () => clearInterval(timer); // Clean up the timer on unmount
    }
  }, [isDuelMode, timeLeft]);

  // Function to handle running code
  const handleRunCode = async () => {
    try {
      const response = await axiosInstance.post('/problem/run', {
        code,
        language, // Send selected programming language along with the code
      });
      setOutput(response.data);  // Display output from backend
    } catch (error) {
      console.error('Error running code:', error);
      setOutput(error.response ? error.response.data : 'Error running code.');
    }
  };

  // Function to handle checking solution correctness
  const handleCheckSolution = async () => {
    try {
      const response = await axiosInstance.post('/problem/check', {
        problemId: id,
        submittedSolution: code,
      });
      setIsCorrect(response.data);  // Display whether the solution is correct
    } catch (error) {
      console.error('Error checking solution:', error);
      setIsCorrect(false);
    }
  };

  return (
    <Div d="flex" flexDir="row" minH="100vh" p="2rem">
      
      {/* Left Side: Problem Details */}
      <Div w="50%" p="1rem" border="1px solid #e0e0e0" shadow="4" rounded="lg">
        <Text tag="h2" textSize="title" m={{ b: "1rem" }}>Problem {id}</Text>
        <Text textSize="body" textColor="gray700" m={{ b: "1rem" }}>
          {/* Problem description goes here */}
          Return indices of two numbers that add up to a target value in an array.
        </Text>
        <Text textSize="caption" textColor="gray500" m={{ b: "1rem" }}>Difficulty: Easy</Text>
      </Div>

      {/* Right Side: Code Editor and Run Code Button */}
      <Div w="50%" p="3rem" d="flex" flexDir="column" align="center" border="1px solid #e0e0e0" shadow="4" rounded="lg" m={{ l: "5rem" }}>
        
        {/* Monaco Code Editor */}
        <Editor
          height="400px"
          defaultLanguage={language}
          value={code}
          onChange={(newValue) => setCode(newValue)}
        />

        {/* Language Selector */}
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ marginTop: '10px' }}>
          <option value="java">Java</option>
          <option value="python">Python</option>
          {/* Add more languages as needed */}
        </select>

        {/* Run Code Button */}
        <Button bg="info700" hoverBg="info800" textColor="white" onClick={handleRunCode} m={{ t: "1rem" }}>
          Run Code
        </Button>

        {/* Check Solution Button */}
        <Button bg="success700" hoverBg="success800" textColor="white" onClick={handleCheckSolution} m={{ t: "1rem" }}>
          Check Solution
        </Button>

        {/* Output Section */}
        {output && (
          <Div m={{ t: "2rem", b: "2rem", x: "auto", y: "auto"}}>
            <Text tag="h3">Output:</Text>
            <pre>{output}</pre>
          </Div>
        )}

        {/* Solution Correctness Section */}
        {isCorrect !== null && (
          <Div m={{ t: "2rem", b: "2rem", x: "auto", y: "auto"}}>
            {isCorrect ? (
              <Text tag="h3" textColor="success700">Correct Solution!</Text>
            ) : (
              <Text tag="h3" textColor="danger700">Incorrect Solution.</Text>
            )}
          </Div>
        )}

        {/* Timer Section (Only for Duel Mode) */}
        {isDuelMode && (
          <Div d='flex' justify='center' align='center' m={{ t: '2rem' }}>
            <Text tag='h3' textColor='danger700'>
              Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </Text>
          </Div>
        )}
        
      </Div>
    </Div>
  );
};

export default ProblemPage;

