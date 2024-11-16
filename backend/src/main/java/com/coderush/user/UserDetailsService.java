package com.coderush.user;

import com.coderush.mysql.MySqlHandler;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Get the username from the email
        String username = MySqlHandler.getUsernameFromEmail(email);

        if (username == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        // Get user information and roles from the database
        String passwordHash = MySqlHandler.getPasswordHash(username);
        String userEmail = MySqlHandler.getUserEmail(username);
        //Collection<Role> roles = MySqlHandler.getRolesByUsername(username); // Retrieve roles from DB

        if (passwordHash == null || userEmail == null) {
            throw new UsernameNotFoundException("User not found.");
        }


        // Return the user object with email, password, and authorities
        return new org.springframework.security.core.userdetails.User(userEmail, passwordHash, Collections.emptyList());
    }


    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        Collection<? extends GrantedAuthority> mapRoles = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getUsername()))
                .collect(Collectors.toList());
        return mapRoles;
    }
}
