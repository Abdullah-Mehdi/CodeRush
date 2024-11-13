package com.coderush.user;

import com.coderush.solution.Solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Provides access to the code editor for a logged-in user
    @GetMapping("/access-editor")
    public void accessEditor(@RequestParam String username) {

    }

    // Starts a new match for a logged-in user
    @PostMapping("/start-match")
    public void startMatch(@RequestParam String username) {

    }

    // Submits a solution for a logged-in user
    @PostMapping("/submit-solution")
    public void submitSolution(@RequestParam String username, @RequestBody Solution solution) {

    }
}
