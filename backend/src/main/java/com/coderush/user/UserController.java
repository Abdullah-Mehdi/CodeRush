package com.coderush.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from the React frontend
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public boolean addUser(@RequestParam String username, @RequestParam String passwordHash, @RequestParam String email) {
        return userService.addUser(username, passwordHash, email);
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
