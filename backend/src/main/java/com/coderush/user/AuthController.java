package com.coderush.user;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import com.coderush.mysql.MySqlHandler; // Import your database handler
import java.util.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class AuthController {

    /**
     * Signup Endpoint
     * @param userData contains username, email, and password
     * @return success or failure message
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String, String> userData) {
        try {
            String username = userData.get("username");
            String email = userData.get("email");
            String password = userData.get("password"); // Plain-text password

            // Add user to the database
            boolean success = MySqlHandler.addUser(username, password, email);

            if (success) {
                return ResponseEntity.ok("Signup successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists or signup failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during signup.");
        }
    }

    /**
     * Login Endpoint
     * @param loginData contains email and password
     * @return success or failure message
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email");
            String password = loginData.get("password");

            // Retrieve stored password from the database
            String storedPassword = MySqlHandler.getPasswordHash(email);

            if (storedPassword != null && storedPassword.equals(password)) {
                // Generate a simple token (for demo purposes, replace with a proper JWT in production)
                String token = Base64.getEncoder().encodeToString((email + ":" + System.currentTimeMillis()).getBytes());

                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("message", "Login successful");

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials"));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "An error occurred during login."));
        }
    }
}
