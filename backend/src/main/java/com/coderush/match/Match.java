package com.coderush.match;

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
public class Match {
    // Attributes
    private Integer id;
    private List<User> users;        // List of users participating in the match
    private Problem problem;         // The problem assigned to the match
    private Timer timer;             // Timer for match duration
    private long matchDuration;      // Duration of the match in milliseconds
    private boolean isMatchActive;   // Status of the match


}
