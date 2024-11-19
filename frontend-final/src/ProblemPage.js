import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Div, Text, Button } from 'atomize';
import Editor from "@monaco-editor/react";

// Import mockProblems data
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

const testCases = {
    1: [ // Two Sum
        {
            input: {
                nums: [2, 7, 11, 15],
                target: 9
            },
            expected: [0, 1]
        },
        {
            input: {
                nums: [3, 2, 4],
                target: 6
            },
            expected: [1, 2]
        }
    ],

    2: [ // Longest Common Prefix
      {
          input: {
              strs: ["flower", "flow", "flight"]
          },
          expected: "fl"
      },
      {
          input: {
              strs: ["dog", "racecar", "car"]
          },
          expected: ""
      },
      {
          input: {
              strs: ["interspecies", "interstellar", "interstate"]
          },
          expected: "inters"
      }
  ],

  3: [ // Palindrome Number test cases
    {
        input: {
            num: 121
        },
        expected: true
    },
    {
        input: {
            num: -121
        },
        expected: false
    },
    {
        input: {
            num: 10
        },
        expected: false
    },
    {
        input: {
            num: 12321
        },
        expected: true
    }
  ]
    // Add test cases for other problems as needed
};

const ProblemPage = ({ isDuelMode }) => {
    const { id } = useParams();
    const [code, setCode] = useState('# Start coding here\n');
    const [output, setOutput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [language, setLanguage] = useState('python');
    const [timeLeft, setTimeLeft] = useState(900);
    const [processing, setProcessing] = useState(false);
    const [pyodide, setPyodide] = useState(null);
    const [currentProblem, setCurrentProblem] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false); 

      // Helper function to compare arrays - definining it before use
      const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        return sorted1.every((value, index) => value === sorted2[index]);
    };
    
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

    // Load current problem
    useEffect(() => {
        const problem = mockProblems.find(p => p.id === parseInt(id));
        setCurrentProblem(problem);
    }, [id]);

    // Timer logic with time up handling
    useEffect(() => {
      if (isDuelMode && timeLeft > 0) {
          const timer = setInterval(() => {
              setTimeLeft(prev => {
                  if (prev <= 1) {
                      clearInterval(timer);
                      setIsTimeUp(true);
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
          return () => clearInterval(timer);
      }
  }, [isDuelMode]);

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        setCode(e.target.value === 'python' ? '# Start coding here\n' : '// Start coding here\n');
    };

    const handleRunCode = async () => {
        if (!pyodide) {
            setOutput('Python environment is not ready yet. Please wait...');
            return;
        }

        setProcessing(true);
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
      if (!pyodide) {
        setOutput('Python environment is not ready yet. Please wait...');
        return;
    }

    setProcessing(true);
    try {
        const currentTestCases = testCases[parseInt(id)];
        if (!currentTestCases) {
            setOutput('No test cases found for this problem.');
            setIsCorrect(false);
            return;
        }

        let allTestsPassed = true;
        let testResults = [];

        for (const testCase of currentTestCases) {
            try {
                // Reset stdout for each test case
                pyodide.runPython(`
                    import sys
                    import io
                    sys.stdout = io.StringIO()
                `);

                // Different wrapper based on problem ID
                let wrapper;
                const problemId = parseInt(id);
                
                if (problemId === 1) {
                    wrapper = `
${code}

# Test case input
nums = ${JSON.stringify(testCase.input.nums)}
target = ${testCase.input.target}

# Run the solution
result = two_sum(nums, target)
print(result)
                    `;
                } else if (problemId === 2) {
                    wrapper = `
${code}

# Test case input
strs = ${JSON.stringify(testCase.input.strs)}

# Run the solution
result = longest_common_prefix(strs)
print(result)
                    `;
                } else if (problemId === 3) {
                    wrapper = `
${code}

# Test case input
num = ${testCase.input.num}

# Run the solution
result = is_palindrome(num)
print(str(result).lower())
                    `;
                }

                await pyodide.runPythonAsync(wrapper);
                const output = pyodide.runPython("sys.stdout.getvalue()").trim();
                
                // Different comparison logic based on problem ID
                let isTestPassed;
                if (problemId === 1) {
                    const result = JSON.parse(output.replace(/\(/g, '[').replace(/\)/g, ']'));
                    isTestPassed = arraysEqual(result, testCase.expected);
                } else if (problemId === 2) {
                    isTestPassed = output === `"${testCase.expected}"` || 
                                 output === `'${testCase.expected}'` || 
                                 output === testCase.expected;
                } else if (problemId === 3) {
                    const resultBool = output.trim() === 'true';
                    isTestPassed = resultBool === testCase.expected;
                }

                testResults.push({
                    input: testCase.input,
                    expected: testCase.expected,
                    output: problemId === 3 ? output.trim() === 'true' :
                           problemId === 1 ? JSON.parse(output.replace(/\(/g, '[').replace(/\)/g, ']')) :
                           output.replace(/['"]/g, ''),
                    passed: isTestPassed
                });

                if (!isTestPassed) {
                    allTestsPassed = false;
                }

            } catch (error) {
                testResults.push({
                    input: testCase.input,
                    error: error.message,
                    passed: false
                });
                allTestsPassed = false;
            }
        }

        const resultOutput = formatTestResults(testResults);
        setOutput(resultOutput);
        setIsCorrect(allTestsPassed);

    } catch (error) {
        setOutput(`Error: ${error.message}`);
        setIsCorrect(false);
    } finally {
        setProcessing(false);
    }
};

const formatTestResults = (results) => {
    const problemId = parseInt(id);
    return results.map((result, index) => {
        if (result.error) {
            if (problemId === 1) {
                return `Test Case ${index + 1}: Failed\nInput: nums=${JSON.stringify(result.input.nums)}, target=${result.input.target}\nError: ${result.error}\n`;
            } else if (problemId === 2) {
                return `Test Case ${index + 1}: Failed\nInput: strs=${JSON.stringify(result.input.strs)}\nError: ${result.error}\n`;
            } else if (problemId === 3) {
                return `Test Case ${index + 1}: Failed\nInput: num=${result.input.num}\nError: ${result.error}\n`;
            }
        }
        
        if (problemId === 1) {
            return `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\nInput: nums=${JSON.stringify(result.input.nums)}, target=${result.input.target}\nExpected: ${JSON.stringify(result.expected)}\nGot: ${JSON.stringify(result.output)}\n`;
        } else if (problemId === 2) {
            return `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\nInput: strs=${JSON.stringify(result.input.strs)}\nExpected: "${result.expected}"\nGot: "${result.output}"\n`;
        } else if (problemId === 3) {
            return `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\nInput: num=${result.input.num}\nExpected: ${result.expected}\nGot: ${result.output}\n`;
        }
    }).join('\n');
};

// Add initial code template based on problem ID
useEffect(() => {
    const problemId = parseInt(id);
    if (problemId === 1) {
        setCode(`def two_sum(nums, target):
    # Write your solution here
    # Return indices of two numbers that add up to target
    # Example: nums = [2,7,11,15], target = 9 should return [0,1]
    pass`);
    } else if (problemId === 2) {
        setCode(`def longest_common_prefix(strs):
    # Write your solution here
    # Return the longest common prefix string
    # Example: ["flower", "flow", "flight"] should return "fl"
    pass`);
    } else if (problemId === 3) {
      setCode(`def is_palindrome(num):
    # Write your solution here
    # Return True if the number is a palindrome, False otherwise
    # Example: 121 should return True because it reads the same forward and backward
    pass`);
    }
}, [id]);

    if (!currentProblem) {
        return <Div>Loading problem...</Div>;
    }

    return (
        <Div d="flex" flexDir="row" minH="100vh" p="2rem">
            {/* Left Side: Problem Details */}
            <Div w="50%" p="1rem" border="1px solid #e0e0e0" shadow="4" rounded="lg">
                <Text tag="h2" textSize="title" m={{ b: "1rem" }}>{currentProblem.title}</Text>
                <Text textSize="body" textColor="gray700" m={{ b: "1rem" }}>
                    {currentProblem.description}
                </Text>
                <Text textSize="caption" textColor="gray500" m={{ b: "1rem" }}>
                    Difficulty: {currentProblem.difficulty}
                </Text>
                
                {/* Language Selection */}
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
                        disabled={processing || (isDuelMode && isTimeUp)}
                        w="45%"
                        opacity={isDuelMode && isTimeUp ? "0.5" : "1"}
                    >
                        Submit Solution
                    </Button>
                </Div>

                {/* Output Window */}
                <Div bg="gray100" p="1rem" rounded="md">
                    <Text tag="pre" textSize="body">
                        {output}
                    </Text>
                </Div>

                {/* Timer Display */}
                {isDuelMode && (
                    <Text 
                        textSize="body" 
                        m={{ t: "1rem" }}
                        textColor={isTimeUp ? "danger700" : "gray800"}
                        d="flex"
                        justify="center"
                        bold={isTimeUp}
                    >
                        Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                    </Text>
                )}

                {/* Time Up Message */}
                {isDuelMode && isTimeUp && (
                    <Div
                        bg="danger100"
                        p="1rem"
                        rounded="md"
                        m={{ t: "1rem" }}
                        border="1px solid"
                        borderColor="danger700"
                    >
                        <Text
                            textAlign="center"
                            textColor="danger700"
                            textSize="body"
                        >
                            Time's up! You can no longer submit your solution, but you can still:
                            <ul style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                <li>Run the code to test it</li>
                                <li>Copy your code and try it in Practice mode</li>
                            </ul>
                        </Text>
                        <Link 
                            to={`/practice-mode/${id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button 
                                bg="info700"
                                hoverBg="info800"
                                textColor="white"
                                w="100%"
                                m={{ t: "0.5rem" }}
                            >
                                Go to Practice Mode
                            </Button>
                        </Link>
                    </Div>
                )}

                {/* Solution Result Message */}
                {isCorrect !== null && (
                    <Text 
                        textSize="body" 
                        textColor={isCorrect ? "success700" : "danger700"} 
                        m={{ t: "1rem" }}
                    >
                        {isCorrect ? "All test cases passed!" : "Some test cases failed. Please try again."}
                    </Text>
                )}
            </Div>
        </Div>
    );
};

export default ProblemPage;
