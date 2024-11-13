package com.coderush.problem;

import com.coderush.testcase.TestCase;
import jakarta.persistence.*;

import java.util.*;

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
    // Constructor
    public Problem() {}
    public Problem(Integer id, String title, String description, String difficulty, String template) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.template = template;
    }

    // Setters
    public void setId(Integer id) {this.id = id;}

    public void setTitle(String title) {this.title = title;}

    public void setDescription(String description) {this.description = description;}

    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

    public void setTemplate(String template) {this.template = template;}

    public void setTestCases(List<TestCase> testCases) {this.testCases = testCases;}

    // Getters
    public Integer getId() {return id;}

    public String getTitle() {return title;}

    public String getDescription() {return description;}

    public String getDifficulty() {return difficulty;}

    public String getTemplate() {return template;}

    public List<TestCase> getTestCases() {return testCases;}
}
