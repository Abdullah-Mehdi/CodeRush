package com.coderush.models;

public class CodeSubmission {
    private String code;
    private String language;
    private String stdin;  // Optional: for test cases

    // Getters and setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getStdin() {
        return stdin;
    }

    public void setStdin(String stdin) {
        this.stdin = stdin;
    }
}



