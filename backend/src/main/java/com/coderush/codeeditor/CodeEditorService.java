package com.coderush.codeeditor;

import org.springframework.stereotype.Service;

@Service
public class CodeEditorService {

    private String code = "";
    private String templateCode = "";

    // Edits the code
    public void editCode(String newCode) {
        this.code = newCode;
        System.out.println("Code edited successfully.");
    }

    // Executes the code (dummy implementation)
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

    // Loads a template into the editor
    public void loadTemplate(String template) {
        this.templateCode = template;
        this.code = template; // Set the editor code to start with the template
        System.out.println("Template loaded into editor.");
    }
}
