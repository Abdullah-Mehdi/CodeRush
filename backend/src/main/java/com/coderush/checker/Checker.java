package com.coderush.checker;

import com.coderush.problem.Problem;
import com.coderush.solution.Solution;
import com.coderush.problem.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Service
public class Checker {

    // Method to run all test cases for a solution and return true if all pass, false if any fails
    public boolean runTestCases(Solution solution, Problem problem) {
        List<TestCase> testCases = problem.getTestCases();

        // Iterate over each test case and check the solution against it
        for (TestCase testCase : testCases) {
            boolean passed = runSingleTestCase(solution, testCase);
            if (!passed) {
                return false;  // Return false as soon as a test case fails
            }
        }

        return true;  // Return true if all test cases passed
    }

    // Helper method to run a single test case on the user's solution
    private boolean runSingleTestCase(Solution solution, TestCase testCase) {
        // Get the parsed input and expected output
        Object input = testCase.getParsedInput();  // Parsed input (could be Integer, Boolean, char, String, etc.)
        Object expectedOutput = testCase.getParsedExpectedOutput();  // Parsed expected output

        // Simulate executing the user code with the given input
        String result = executeUserCode(solution.getCode(), input.toString());

        // Compare the result with the expected output after parsing both sides to Strings
        return result.equals(expectedOutput.toString());
    }

    // Simulated method for executing user code
    private String executeUserCode(String code, String input) {
        // Integrate a code execution service like Judge0 or your own execution environment
        // For now, simulate execution and return a placeholder output
        System.out.println("Executing code: " + code);
        System.out.println("With input: " + input);

        // Placeholder for actual execution logic. Replace this with a real service call.
        return "simulated_output";  // Placeholder for actual result
    }
}
