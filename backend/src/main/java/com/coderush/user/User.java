package com.coderush.user;

import jakarta.persistence.*;

@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // Attributes
    private Integer id;
    private String username;
    private String password;
    private String email;
    private boolean isLoggedIn;

    public User() {}

    // Constructor
    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.isLoggedIn = false; // User starts as logged out
    }
    // Getters
    public Integer getId() {return id;}

    public String getUsername() {return username;}

    public String getPassword() {return password;}

    public String getEmail() {return email;}

    public boolean isLoggedIn() {return isLoggedIn;}

    // Setters (optional depending on if you want to allow changing these)
    public void setId(Integer id) {this.id = id;}

    public void setUsername(String username) {this.username = username;}

    public void setPassword(String password) {this.password = password;}

    public void setEmail(String email) {this.email = email;}

    public void setLoggedIn(boolean loggedIn) {isLoggedIn = loggedIn;}
}
