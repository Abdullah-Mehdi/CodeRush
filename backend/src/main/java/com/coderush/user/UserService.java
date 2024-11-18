package com.coderush.user;


import com.coderush.mysql.MySqlHandler;
import org.springframework.stereotype.Service;


import java.util.Objects;


@Service
public class UserService {


    public boolean loginUser(String email, String password) {
        String username = MySqlHandler.getUsernameFromEmail(email);
        if(username == null) { return false; }


        String userPasswordHash = MySqlHandler.getPasswordHash(username);
        if(userPasswordHash == null) { return false; }


        return Objects.equals(userPasswordHash, password);
    }


    public boolean addUser(String email, String username, String password) {
        // Calls the static addUser method from MySqlHandler
        return MySqlHandler.addUser(username, password, email);
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
