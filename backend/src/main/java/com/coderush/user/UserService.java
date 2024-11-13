package com.coderush.user;

import java.util.*;

public interface UserService {

    void saveUser(UserDTO userDTO);

    User findUserByEmail(String email);

    List<UserDTO> findAllUsers();


}
