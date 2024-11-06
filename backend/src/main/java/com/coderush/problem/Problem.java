package com.coderush.problem;

import java.util.*;

public class Problem {
    // Attributes
    private Integer id;
    private String title;
    private String description;
    private String difficulty;
    private String template;
    private List<Object[]> testCases;
    // Constructor
    public Problem() {}
    public Problem(Integer id, String title, String description, String difficulty) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
    }

    // Setters
    public void setId(Integer id) {this.id = id;}

    public void setTitle(String title) {this.title = title;}

    public void setDescription(String description) {this.description = description;}

    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

    public void setTemplate(String template) {this.template = template;}

    public void setTestCases(List<Object[]> testCases) {this.testCases = testCases;}

    // Getters
    public Integer getId() {return id;}

    public String getTitle() {return title;}

    public String getDescription() {return description;}

    public String getDifficulty() {return difficulty;}

    public String getTemplate() {return template;}

    public List<Object[]> getTestCases() {return testCases;}
}
