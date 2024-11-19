package com.coderush.controller;

import com.coderush.user.User;
import com.coderush.user.UserService;
import com.coderush.models.LoginRequest;
import com.coderush.models.SignupRequest;
import com.coderush.controller.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        log.info("Received signup request for email: {}", request.getEmail());
        try {
            userService.signup(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
            );
            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
        } catch (Exception e) {
            log.error("Signup failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("Received login request for email: {}", request.getEmail());
        try {
            User user = userService.login(request.getEmail(), request.getPassword());
            user.setPassword(null); // Don't send password back to client
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage()));
        }
    }
}





