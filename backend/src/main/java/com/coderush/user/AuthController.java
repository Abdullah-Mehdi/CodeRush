package com.coderush.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserServiceImpl userService;


    private AuthenticationManager authenticationManager;

    @Autowired
    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }

    // Handler to handle user registration
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO userDto) {
        User existingUser = userService.findUserByEmail(userDto.getEmail());

        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body("There is already an account registered with the same email");
        }

        userService.saveUser(userDto);
        return ResponseEntity.ok("User registered successfully");
    }

    // Handler to handle list of users
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    // Handler to handle login (consider implementing JWT here)
    @PostMapping("/login-signup")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authRequest =
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        try {
            Authentication auth = authenticationManager.authenticate(authRequest);
            SecurityContextHolder.getContext().setAuthentication(auth);
            return ResponseEntity.ok("Login successful");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}