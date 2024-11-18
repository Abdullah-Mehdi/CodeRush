package com.coderush.codeeditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "api/v1/codeeditor")
public class CodeEditorController {
    private final CodeEditorService codeEditorService;

    @Autowired
    public CodeEditorController(CodeEditorService codeEditorService) {
        this.codeEditorService = codeEditorService;
    }
    // Endpoint to load a template
    @PostMapping("/loadTemplate")
    public ResponseEntity<Map<String, String>> loadTemplate(@RequestParam String template) {
        if (template == null || template.trim().isEmpty()) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Template cannot be null or empty.");
            return ResponseEntity.badRequest().body(errorResponse);
        }
        codeEditorService.loadTemplate(template);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Template loaded successfully.");
        return ResponseEntity.ok(response);
    }
}

