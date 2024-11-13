package com.coderush.checker;

import com.coderush.problem.Problem;
import com.coderush.solution.Solution;
import com.coderush.problem.TestCase;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Checker {
    private Integer test;
    // Method to run all test cases for a solution and return if they pass or fail
    public boolean runTestCases(Solution solution, Problem problem) {
        List<TestCase> testCases = problem.getTestCases();
        for (TestCase testCase : testCases) {
            boolean passed = runSingleTestCase(solution, testCase);
            if (!passed) {
                return false; // Stop on first failure
            }
        }
        return true;
    }

    // Helper method to run a single test case on the user's solution
    private boolean runSingleTestCase(Solution solution, TestCase testCase) {
        String result = executeUserCode(solution.getCode(), testCase.getInput());
        return result.equals(testCase.getExpectedOutput());
    }

    // Simulated method for executing user code
    private String executeUserCode(String code, String input) {
        // This method would contain logic to send code to the compiler API, e.g., using Judge0
        return ""; // Placeholder return for actual execution result
    }
}
