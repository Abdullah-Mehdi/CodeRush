package com.coderush.problem;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProblemRepository extends CrudRepository<Problem, Integer> {

    @Query("SELECT p FROM Problem p WHERE p.title = ?1")
    Optional<Problem> findProblemByTitle(String title);
}
