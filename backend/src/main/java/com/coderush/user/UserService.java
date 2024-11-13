package com.coderush.user;

import com.coderush.solution.Solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Temporary map to track logged-in users by their usernames
    private final Map<String, Boolean> loggedInUsers = new HashMap<>();

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retrieves all users from the repository
    public List<User> getUsers() {
        return (List<User>) userRepository.findAll();
    }

    // Adds a new user to the repository after checking for email uniqueness
    public void addNewUser(User user) {
        Optional<User> userOptional = userRepository.findUserByEmail(user.getEmail());
        if (userOptional.isPresent()) {
            throw new IllegalStateException("Email is already taken.");
        }
        userRepository.save(user);
    }

    // Validates login credentials and marks the user as logged in
    public boolean validateUserCredentials(String username, String password) {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            loggedInUsers.put(username, true);
            return true;
        }
        return false;
    }

    // Checks if a user is logged in by username
    public boolean isUserLoggedIn(String username) {
        return loggedInUsers.getOrDefault(username, false);
    }

    // Logs out the user by username
    public void logoutUser(String username) {
        loggedInUsers.put(username, false);
    }

    // Grants access to the code editor for a logged-in user
    public void accessEditor(String username) {
        if (isUserLoggedIn(username)) {
            System.out.println("User " + username + " is accessing the code editor.");
            // Implement editor access logic here if needed
        } else {
            System.out.println("User " + username + " must log in to access the editor.");
        }
    }

    // Starts a new match for a logged-in user
    public void startMatch(String username) {
        if (isUserLoggedIn(username)) {
            System.out.println("User " + username + " is starting a new match.");
            // Implement match start logic here
        } else {
            System.out.println("User " + username + " must log in to start a match.");
        }
    }

    // Submits a solution for a logged-in user
    public void submitSolution(String username, Solution solution) {
        if (isUserLoggedIn(username)) {
            System.out.println("User " + username + " submitted a solution.");
            // Logic to save and evaluate the solution would go here
        } else {
            System.out.println("User " + username + " must log in to submit a solution.");
        }
    }
}
