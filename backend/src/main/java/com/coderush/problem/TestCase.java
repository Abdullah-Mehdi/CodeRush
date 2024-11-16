package com.coderush.problem;

import com.coderush.problem.Problem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String input;  // Store input as String
    private String expectedOutput; // Store expected output as String

    @ManyToOne
    @JoinColumn(name = "problem_id")
    private Problem problem;

    // Constructor for convenience (custom format for input/output)
    public TestCase(String input, String expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    // Convert the input to the required type
    public Object getParsedInput() {
        if (input != null) {
            if (input.equalsIgnoreCase("true") || input.equalsIgnoreCase("false")) {
                return Boolean.parseBoolean(input); // Parse boolean
            } else if (input.length() == 1) {
                return input.charAt(0); // Parse char
            } else if (input.matches("-?\\d+")) {
                return Integer.parseInt(input); // Parse integer
            } else {
                return input; // Return as string
            }
        }
        return null;
    }

    // Convert the expected output to the required type
    public Object getParsedExpectedOutput() {
        if (expectedOutput != null) {
            if (expectedOutput.equalsIgnoreCase("true") || expectedOutput.equalsIgnoreCase("false")) {
                return Boolean.parseBoolean(expectedOutput); // Parse boolean
            } else if (expectedOutput.length() == 1) {
                return expectedOutput.charAt(0); // Parse char
            } else if (expectedOutput.matches("-?\\d+")) {
                return Integer.parseInt(expectedOutput); // Parse integer
            } else {
                return expectedOutput; // Return as string
            }
        }
        return null;
    }
}
