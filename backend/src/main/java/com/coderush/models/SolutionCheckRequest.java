package com.coderush.models;

public class SolutionCheckRequest {
    private Long problemId;         // The ID of the problem being solved
    private String submittedSolution; // The solution submitted by the user

    // Constructors
    public SolutionCheckRequest() {}

    public SolutionCheckRequest(Long problemId, String submittedSolution) {
        this.problemId = problemId;
        this.submittedSolution = submittedSolution;
    }

    // Getters and Setters
    public Long getProblemId() {
        return problemId;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public String getSubmittedSolution() {
        return submittedSolution;
    }

    public void setSubmittedSolution(String submittedSolution) {
        this.submittedSolution = submittedSolution;
    }
}
