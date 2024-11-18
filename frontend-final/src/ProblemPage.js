import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Div, Text, Button } from 'atomize';
import Editor from "@monaco-editor/react";

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

const ProblemPage = ({ isDuelMode }) => {
  const { id } = useParams();
  const [code, setCode] = useState('# Start coding here\n');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [language, setLanguage] = useState('python');
  const [timeLeft, setTimeLeft] = useState(900);
  const [processing, setProcessing] = useState(false);
  const [pyodide, setPyodide] = useState(null);

  // Initialize Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Error loading Pyodide:', error);
        setOutput('Error loading Python environment');
      }
    };
    loadPyodide();
  }, []);

  // Timer for duel mode
  useEffect(() => {
    if (isDuelMode && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isDuelMode, timeLeft]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Reset code based on language selection
    if (e.target.value === 'python') {
      setCode('# Start coding here\n');
    } else if (e.target.value === 'java') {
      setCode('// Start coding here\n');
    }
  };

  const handleRunCode = async () => {
    if (!pyodide) {
      setOutput('Python environment is not ready yet. Please wait...');
      return;
    }

    setProcessing(true);
    setOutput('Running...');

    try {
      // Redirect Python's stdout to capture print statements
      pyodide.runPython(`
        import sys
        import io
        sys.stdout = io.StringIO()
      `);
      
      await pyodide.runPythonAsync(code);
      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout || 'No output');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitSolution = async () => {
    try {
      setProcessing(true);
      // Here you would implement the solution checking logic
      // For now, just show a success message
      setIsCorrect(true);
      setOutput('Solution submitted successfully!');
    } catch (error) {
      setIsCorrect(false);
      setOutput('Error submitting solution. Please try again.');
    } finally {
      setProcessing(false);
    }
  };


  // Get problem details from mockProblems array
  const problem = mockProblems.find(p => p.id === parseInt(id));

  return (
    <Div d="flex" flexDir="row" minH="100vh" p="2rem">
      {/* Left Side: Problem Details */}
      <Div w="50%" p="1rem" border="1px solid #e0e0e0" shadow="4" rounded="lg">
        <Text tag="h2" textSize="title" m={{ b: "1rem" }}>{problem?.title || `Problem ${id}`}</Text>
        <Text textSize="body" textColor="gray700" m={{ b: "1rem" }}>
          {problem?.description || 'Loading problem description...'}
        </Text>
        <Text textSize="caption" textColor="gray500" m={{ b: "1rem" }}>
          Difficulty: {problem?.difficulty || 'Easy'}
        </Text>
        
        {/* Language Selection Dropdown */}
        <select
          onChange={handleLanguageChange}
          value={language}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            width: '200px'
          }}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </Div>

      {/* Right Side: Code Editor and Output */}
      <Div w="50%" p="1rem">
        <Editor
          height="50vh"
          language={language}
          value={code}
          onChange={setCode}
          theme="vs-dark"
        />
        <Div d="flex" justify="space-between" m={{ y: "1rem" }}>
          <Button 
            onClick={handleRunCode} 
            bg="info700"
            hoverBg="info800"
            textColor="white"
            disabled={processing || !pyodide}
            w="45%"
          >
            {processing ? 'Running...' : 'Run Code'}
          </Button>
          <Button 
            onClick={handleSubmitSolution}
            bg="success700"
            hoverBg="success800"
            textColor="white"
            disabled={processing}
            w="45%"
          >
            Submit Solution
          </Button>
        </Div>
        <Div bg="gray100" p="1rem" rounded="md">
          <Text tag="pre" textSize="body">
            {output}
          </Text>
        </Div>
        {isDuelMode && (
          <Text textSize="body" m={{ t: "1rem" }}>
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
          </Text>
        )}
        {isCorrect !== null && (
          <Text 
            textSize="body" 
            textColor={isCorrect ? "success700" : "danger700"} 
            m={{ t: "1rem" }}
          >
            {isCorrect ? "Correct solution!" : "Incorrect solution. Try again."}
          </Text>
        )}
      </Div>
    </Div>
  );
};

export default ProblemPage;

