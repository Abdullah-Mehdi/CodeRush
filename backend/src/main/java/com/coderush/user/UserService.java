package com.coderush.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public User signup(String username, String email, String password) {
        log.info("Starting signup process for user: {}", email);
        
        try {
            // Check if email exists
            if (userRepository.existsByEmail(email)) {
                log.warn("Email already exists: {}", email);
                throw new RuntimeException("Email already exists");
            }

            // Check if username exists
            if (userRepository.existsByUsername(username)) {
                log.warn("Username already exists: {}", username);
                throw new RuntimeException("Username already exists");
            }

            // Create new user
            log.debug("Creating new user with email: {}", email);
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            
            // Save user
            User savedUser = userRepository.save(user);
            log.info("Successfully created user with email: {}", email);
            
            return savedUser;
        } catch (Exception e) {
            log.error("Error during signup process: {}", e.getMessage());
            throw e;
        }
    }
    @Transactional
    public User login(String email, String password) {
        log.info("Attempting login for user: {}", email);
        
        try {
            // Find user by email
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("No user found with email: {}", email);
                    return new RuntimeException("User not found");
                });
            
            // Check password
            if (!passwordEncoder.matches(password, user.getPassword())) {
                log.warn("Invalid password for user: {}", email);
                throw new RuntimeException("Invalid password");
            }
            
            log.info("Successfully logged in user: {}", email);
            return user;
        } catch (Exception e) {
            log.error("Login failed for user {}: {}", email, e.getMessage());
            throw e;
        }
}
}

