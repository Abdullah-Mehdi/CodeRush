import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Div, Text, Button } from 'atomize';
import Editor from "@monaco-editor/react";
import axiosInstance from './axiosConfig';
import OutputWindow from './components/OutputWindow';

const ProblemPage = ({ isDuelMode }) => {
  const { id } = useParams();
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [language, setLanguage] = useState('java');
  const [timeLeft, setTimeLeft] = useState(900);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (isDuelMode && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isDuelMode, timeLeft]);

  const handleRunCode = async () => {
    setProcessing(true);
    try {
      const response = await axiosInstance.post('/problem/run', {
        code,
        language,
        problemId: id
      });
      const result = JSON.parse(response.data);
      setOutput(result.stdout || result.stderr || 'No output');
    } catch (error) {
      console.error('Error running code:', error);
      setOutput('Error running code. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCheckSolution = async () => {
    try {
      const response = await axiosInstance.post('/problem/check', {
        problemId: id,
        submittedSolution: code,
      });
      setIsCorrect(response.data);
    } catch (error) {
      console.error('Error checking solution:', error);
      setIsCorrect(false);
    }
  };

  // Function to handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
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
        
        {/* Language Selection Dropdown */}
        <select
          onChange={handleLanguageChange}
          value={language}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}
        >
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
      </Div>


      {/* Right Side: Code Editor and Output */}
      <Div w="50%" p="1rem">
        <Editor
          height="50vh"
          language={language}
          value={code}
          onChange={setCode}
        />
        <Button 
          onClick={handleRunCode} 
          m={{ y: "1rem" }}
          bg="info700"
          hoverBg="info800"
          textColor="white"
          disabled={processing}
        >
          {processing ? 'Running...' : 'Run Code'}
        </Button>
        <OutputWindow output={output} />
        {isDuelMode && (
          <Text textSize="body" m={{ t: "1rem" }}>
            Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
          </Text>
        )}
        <Button 
          onClick={handleCheckSolution} 
          m={{ t: "1rem" }}
          bg="success700"
          hoverBg="success800"
          textColor="white"
        >
          Submit Solution
        </Button>
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


