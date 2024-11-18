package com.coderush.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/auth")
public class UserController {


    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam String email, @RequestParam String password) {
        boolean success = userService.loginUser(email, password);
        if (success) {
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<String> addUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        boolean success = userService.addUser(username, password, email);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Signup successful");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed");
        }
    }


    @PutMapping("/updateScore")
    public boolean updateScore(@RequestParam String username, @RequestParam int addScore) {
        return userService.updateScore(username, addScore);
    }


    @GetMapping("/getProblem/{id}")
    public String[] getProblem(@PathVariable int id) {
        return userService.getProblem(id);
    }


    @GetMapping("/getUserScore/{username}")
    public int getUserScore(@PathVariable String username) {
        return userService.getUserScore(username);
    }


    @GetMapping("/getUserEmail/{username}")
    public String getUserEmail(@PathVariable String username) {
        return userService.getUserEmail(username);
    }


    @PutMapping("/resetPassword")
    public boolean resetPassword(@RequestParam String username, @RequestParam String newPasswordHash) {
        return userService.resetPassword(username, newPasswordHash);
    }


    @PutMapping("/changeEmail")
    public boolean changeEmail(@RequestParam String username, @RequestParam String newEmail) {
        return userService.changeEmail(username, newEmail);
    }


    // Add more endpoints as needed
}
