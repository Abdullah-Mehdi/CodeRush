package com.coderush.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Problem> getProblemByTitle(String title) {
        return problemRepository.findProblemByTitle(title);
    }
}