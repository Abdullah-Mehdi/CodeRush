package com.coderush.codeeditor;

import org.springframework.stereotype.Service;

@Service
public class CodeEditorService {
    private String templateCode = "";

    // Loads a template into the editor
    public void loadTemplate(String template) {
        this.templateCode = template;
        System.out.println("Template loaded into editor.");
    }
}

