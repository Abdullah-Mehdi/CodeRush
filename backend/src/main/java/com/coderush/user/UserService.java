package com.coderush.user;

import com.coderush.mysql.MySqlHandler;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public boolean addUser(String username, String passwordHash, String email) {
        // Calls the static addUser method from MySqlHandler
        return MySqlHandler.addUser(username, passwordHash, email);
    }

    public boolean updateScore(String username, int addScore) {
        return MySqlHandler.updateScore(username, addScore);
    }

    public String[] getProblem(int id) {
        return MySqlHandler.getProblem(id);
    }

    public int getUserScore(String username) {
        return MySqlHandler.getUserScore(username);
    }

    public String getUserEmail(String username) {
        return MySqlHandler.getUserEmail(username);
    }

    public boolean resetPassword(String username, String newPasswordHash) {
        return MySqlHandler.resetPassword(username, newPasswordHash);
    }

    public boolean changeEmail(String username, String newEmail) {
        return MySqlHandler.changeEmail(username, newEmail);
    }

    // Add other methods for the functionality you want to expose via your controller
}
