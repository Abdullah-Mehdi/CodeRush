package com.coderush.problem;

import com.coderush.models.CodeSubmission;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/problem")
public class ProblemController {

    private static final String JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
    private static final String RAPIDAPI_KEY = "904b660389msh6a9285a005ef768p175becjsn4656b014a0a5"; // Replace with your RapidAPI key
    private static final String RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

    @PostMapping("/run")
    public ResponseEntity<String> runCode(@RequestBody CodeSubmission submission) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            headers.set("X-RapidAPI-Key", RAPIDAPI_KEY);
            headers.set("X-RapidAPI-Host", RAPIDAPI_HOST);
    
            // Create request body for Judge0
            Map<String, String> requestBody = new HashMap<>();
            requestBody.put("source_code", submission.getCode());
            requestBody.put("language_id", getLanguageId(submission.getLanguage()));
            requestBody.put("stdin", ""); // Add input if needed
    
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
            
            // Make request to Judge0
            ResponseEntity<String> response = restTemplate.postForEntity(
                JUDGE0_API_URL,
                entity,
                String.class
            );
    
            // Return the Judge0 response to frontend
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error running code: " + e.getMessage());
        }
    }
    
    private String getLanguageId(String language) {
        switch (language.toLowerCase()) {
            case "java":
                return "62"; // Java (OpenJDK 17)
            case "python":
                return "71"; // Python 3
            default:
                return "62"; // Default to Java
        }
    }
}
    



