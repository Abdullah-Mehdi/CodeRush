package com.coderush.problem;

import com.coderush.mysql.MySqlHandler;
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

    public Problem getProblemById(Integer id) {
        // Get the problem details from MySqlHandler
        String[] problemData = MySqlHandler.getProblem(id);

        // Check if the problem data is valid
        if (problemData[0] != null && problemData[1] != null && problemData[2] != null) {
            // Create and return a new Problem object using the retrieved data
            Problem problem = new Problem();
            problem.setTitle(problemData[0]);
            problem.setDescription(problemData[1]);
            problem.setDifficulty(problemData[2]);

            return problem;
        } else {
            // Return null or throw an exception if the problem is not found
            return null;
        }
    }

    public String getProblemTemplate(Integer problemId) {
        return MySqlHandler.getStartingCode(problemId);
    }
}
