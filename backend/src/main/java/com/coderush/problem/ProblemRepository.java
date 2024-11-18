package com.coderush.problem;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends CrudRepository<Problem, Integer> {

    // Spring Data JPA will automatically implement this based on method name
    Optional<Problem> findProblemById(Integer id);
}
