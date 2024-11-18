package com.coderush.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    @NotEmpty(message = "Username should not be empty")
    private String email;

    @NotEmpty(message = "Password should not be empty")
    private String password;
}