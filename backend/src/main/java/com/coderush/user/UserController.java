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

    @PostMapping(path="/add")
    public @ResponseBody void addNewUser (@RequestParam User user){
        userService.addNewUser(user);
    }

    @GetMapping(path="/all")
    public @ResponseBody List<User> getUsers() {
        return userService.getUsers();
    }

    // Logs in the user with the provided username and password
    @PostMapping("/login")
    public boolean login(@RequestParam String username, @RequestParam String password) {
        if (userService.validateUserCredentials(username, password)) {
            System.out.println("User " + username + " logged in successfully.");
            return true;
        } else {
            System.out.println("Invalid username or password.");
            return false;
        }
    }

    // Logs out the currently logged-in user
    @PostMapping("/logout")
    public void logout(@RequestParam String username) {
        if (userService.isUserLoggedIn(username)) {
            userService.logoutUser(username);
            System.out.println("User " + username + " logged out successfully.");
        } else {
            System.out.println("User is already logged out or does not exist.");
        }
    }

    // Provides access to the code editor for a logged-in user
    @GetMapping("/access-editor")
    public void accessEditor(@RequestParam String username) {
        if (userService.isUserLoggedIn(username)) {
            System.out.println("User " + username + " is accessing the code editor...");
            userService.accessEditor(username);
        } else {
            System.out.println("Please log in to access the code editor.");
        }
    }

    // Starts a new match for a logged-in user
    @PostMapping("/start-match")
    public void startMatch(@RequestParam String username) {
        if (userService.isUserLoggedIn(username)) {
            System.out.println("User " + username + " is starting a new match...");
            userService.startMatch(username);
        } else {
            System.out.println("Please log in to start a match.");
        }
    }

    // Submits a solution for a logged-in user
    @PostMapping("/submit-solution")
    public void submitSolution(@RequestParam String username, @RequestBody Solution solution) {
        if (userService.isUserLoggedIn(username)) {
            System.out.println("User " + username + " submitted a solution.");
            userService.submitSolution(username, solution);
        } else {
            System.out.println("Please log in to submit your solution.");
        }
    }
}
