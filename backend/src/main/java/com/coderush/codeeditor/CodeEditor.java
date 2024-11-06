package com.coderush.codeeditor;

public class CodeEditor {
    // Attributes
    private String templateCode; // Template code loaded for the specific problem
    // Constructor
    public CodeEditor(String templateCode) {
        this.templateCode = templateCode;  // Initialize template as empty
    }
    // Getters
    public String getTemplateCode() {return templateCode;}
    // Setters
    public void setTemplateCode(String templateCode) {this.templateCode = templateCode;}
}