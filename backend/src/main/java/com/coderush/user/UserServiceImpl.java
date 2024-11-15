package com.coderush.user;

import com.coderush.mysql.MySqlHandler;
import com.coderush.solution.Solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void saveUser(UserDTO userDTO) {
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        //encrypt the password using spring security
        user.setPassword(encodedPassword);

        Role role = roleRepository.findByUsername("ROLE_ADMIN");
        if (role == null) {
            role = checkRoleExist();
        }
        user.setRoles(List.of(role));
        userRepository.save(user);

        MySqlHandler.addUser(user.getUsername(), user.getPassword(), user.getEmail());
    }

    private Role checkRoleExist() {
        Role role = new Role();
        role.setUsername("ROLE_ADMIN");
        return roleRepository.save(role);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserDTO> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map((user) -> convertEntityToDTO(user))
                .collect(Collectors.toList());
    }

    private UserDTO convertEntityToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        return userDTO;
    }
    // Update user score (assumes that User has a score attribute or you can get from MySqlHandler)
    public void updateUserScore(String username, int scoreIncrement) {
        // Assuming MySqlHandler is the central handler for DB operations related to users
        boolean success = MySqlHandler.updateScore(username, scoreIncrement);

        if (!success) {
            // Handle failure (maybe throw exception or return a result indicating failure)
            throw new RuntimeException("Failed to update score for user: " + username);
        }
    }

    // Reset user password (This can be added as a separate service method)
    public boolean resetPassword(String username, String newPassword) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        boolean success = MySqlHandler.resetPassword(username, encodedPassword);

        if (!success) {
            throw new RuntimeException("Failed to reset password for user: " + username);
        }

        return true;
    }


}
