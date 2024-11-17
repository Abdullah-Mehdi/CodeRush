package com.coderush.problem;

import com.coderush.models.CodeSubmission;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/problem")
public class ProblemController {

    private static final String JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
    private static final String RAPIDAPI_KEY = "your-rapidapi-key"; // Replace with your RapidAPI key
    private static final String RAPIDAPI_HOST = "judge0-ce.p.rapidapi.com";

    @PostMapping("/run")
    public ResponseEntity<String> runCode(@RequestBody CodeSubmission submission) {
        try {
            // Call external API (e.g., Judge0) to run code
            String output = executeCodeExternally(submission.getCode(), submission.getLanguage());
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            // Handle errors and return an appropriate message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error running code: " + e.getMessage());
        }
    }

    private String executeCodeExternally(String code, String language) throws Exception {
        // Prepare request body for Judge0 API
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("X-RapidAPI-Key", RAPIDAPI_KEY);
        headers.set("X-RapidAPI-Host", RAPIDAPI_HOST);

        String languageId = getLanguageId(language); // Map language name to Judge0's language ID
        String requestBody = String.format("{\"source_code\":\"%s\", \"language_id\": \"%s\"}", code, languageId);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(JUDGE0_API_URL, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody(); // Return output from Judge0 API
        } else {
            throw new Exception("Failed to execute code.");
        }
    }

    private String getLanguageId(String language) {
        switch (language.toLowerCase()) {
            case "java":
                return "62"; // Java (OpenJDK 17) ID in Judge0
            case "python":
                return "71"; // Python 3 ID in Judge0
            default:
                return "62"; // Default to Java if unknown
        }
    }
}



