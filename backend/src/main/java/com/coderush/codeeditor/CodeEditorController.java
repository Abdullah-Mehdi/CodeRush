package com.coderush.codeeditor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public String loadTemplate(@RequestParam String template) {
        codeEditorService.loadTemplate(template);
        return "Template loaded into editor.";
    }
}