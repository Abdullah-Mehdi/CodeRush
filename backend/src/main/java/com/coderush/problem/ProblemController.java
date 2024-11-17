package com.coderush.problem;

import com.coderush.mysql.MySqlHandler;
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

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable("id") Integer id) {
        Optional<Problem> problem = Optional.ofNullable(problemService.getProblemById(id));
        return problem.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}/template")
    public ResponseEntity<String> getProblemTemplate(@PathVariable("id") Integer id) {
        String template = problemService.getProblemTemplate(id);
        if (template != null) {
            return ResponseEntity.ok(template);  // Return the starting code template
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if template is not found
        }
    }
}
