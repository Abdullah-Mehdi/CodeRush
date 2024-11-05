package com.coderush.codeeditor;

public class CodeEditor {
    // Attributes
    private String code;         // The code written by the user
    private String language;     // Programming language selected
    private String templateCode; // Template code loaded for the specific problem

    // Constructor
    public CodeEditor(String language) {
        this.language = language;
        this.code = "";          // Initialize code as empty
        this.templateCode = "";  // Initialize template as empty
    }

    // Getters
    public String getCode() {return code;}
    public String getLanguage() {return language;}
    public String getTemplateCode() {return templateCode;}

    // Setters
    public void setCode(String code) {this.code = code;}
    public void setLanguage(String language) {this.language = language;}
    public void setTemplateCode(String templateCode) {this.templateCode = templateCode;}

    // Method to edit code
    public void editCode(String newCode) {
        this.code = newCode;
        System.out.println("Code edited successfully.");
    }

    // Method to execute code (dummy implementation)
    public String executeCode() {
        System.out.println("Executing code...");

        // Placeholder for code execution logic
        if (code.isEmpty()) {
            return "No code to execute.";
        } else {
            // In a real-world scenario, we would execute this code in a secure sandbox
            // Here we simulate the execution result
            return "Execution result for code: " + code;
        }
    }

    // Method to load a template
    public void loadTemplate(String template) {
        this.templateCode = template;
        this.code = template; // Set the editor code to start with the template
        System.out.println("Template loaded into editor.");
    }
}
