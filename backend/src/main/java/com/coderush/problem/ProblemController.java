package com.coderush.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{id}")
    public Optional<Problem> getProblemById(@PathVariable("id") Integer id) {
        return problemService.getProblemById(id);
    }

    @GetMapping("/{id}/template")
    public ResponseEntity<String> getProblemTemplate(@PathVariable Integer id) {
        String template = problemService.getProblemTemplate(id);
        return ResponseEntity.ok(template);  // Return the problem template as a string
    }

}