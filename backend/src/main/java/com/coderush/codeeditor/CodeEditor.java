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


}
