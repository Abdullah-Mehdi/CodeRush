package com.coderush.match;

import com.coderush.practice.Practice;
import com.coderush.problem.Problem;
import com.coderush.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match extends Practice {
    // Attributes
    private boolean isMatchActive;   // Status of the match
    private List<User> users;

}
