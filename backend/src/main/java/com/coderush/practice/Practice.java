package com.coderush.practice;

import com.coderush.problem.Problem;
import com.coderush.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Practice {
    private Integer id;
    private User user;        // List of users participating in the match
    private Problem problem;
    private boolean isCompleted;
}
