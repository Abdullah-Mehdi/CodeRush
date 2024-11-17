package com.coderush.user;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class CustomInMemoryUserDetailsManager extends InMemoryUserDetailsManager {

    private List<UserDetails> users;

    public CustomInMemoryUserDetailsManager() {
        // Initialize the list of users
        this.users = new ArrayList<>();
    }

    // Override the method to load user by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return users.stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // Add custom logic to create and add a user to the in-memory list
    public void addUser(UserDetails userDetails) {
        this.users.add(userDetails);
    }

    // Add a custom user (e.g., for testing purposes)
    public static CustomInMemoryUserDetailsManager createDefaultManager() {
        CustomInMemoryUserDetailsManager manager = new CustomInMemoryUserDetailsManager();

        // Create a sample user with encoded password and role
        UserDetails user = User.builder()
                .username("test")  // Username
                .password("test") // Example BCrypt encoded password
                .roles("USER")  // Role
                .build();

        manager.addUser(user); // Add user to the in-memory list

        return manager;
    }
}
