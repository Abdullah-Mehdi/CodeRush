package com.coderush.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/problem")
public class ProblemController {

    private final ProblemService problemService;

    @Autowired
    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public List<Problem> getProblems() {
        return problemService.getProblems();
    }

    @GetMapping("/{title}")
    public Optional<Problem> getProblemByTitle(@PathVariable("title") String title) {
        return problemService.getProblemByTitle(title);
    }
}