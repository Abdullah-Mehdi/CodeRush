package com.coderush.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;

    @Autowired
    public ProblemService(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    public List<Problem> getProblems() {
        return (List<Problem>) problemRepository.findAll();
    }

    public Optional<Problem> getProblemById(Integer id) {
        return problemRepository.findProblemById(id);
    }

    public String getProblemTemplate(Integer problemId) {
        Problem problem = problemRepository.findProblemById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found"));
        return problem.getTemplate();  // Return the code template for the problem
    }
}
