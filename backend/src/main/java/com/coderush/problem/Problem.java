package com.coderush.problem;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // Attributes
    private Integer id;
    private String title;
    private String description;
    private String difficulty;
    private String template;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TestCase> testCases = new ArrayList<>();

}
