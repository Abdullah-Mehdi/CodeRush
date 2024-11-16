package com.coderush.checker;

import com.coderush.problem.TestCase;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestResult {
    private TestCase testCase;
    private boolean passed;

    @Override
    public String toString() {
        return "TestCase{" +
                "input='" + testCase.getInput() + '\'' +
                ", expectedOutput='" + testCase.getExpectedOutput() + '\'' +
                ", passed=" + passed +
                '}';
    }
}