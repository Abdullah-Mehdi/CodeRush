package com.coderush.match;

import com.coderush.problem.Problem;
import com.coderush.user.User;

import java.util.*;

public class Match {
    // Attributes
    private Integer id;
    private List<User> users;        // List of users participating in the match
    private Problem problem;         // The problem assigned to the match
    private Timer timer;             // Timer for match duration
    private long matchDuration;      // Duration of the match in milliseconds
    private boolean isMatchActive;   // Status of the match

    // Constructor
    public Match(User user1, User user2, Problem problem, long matchDuration) {
        this.users = new ArrayList<>();
        this.users.add(user1);
        this.users.add(user2);
        this.problem = problem;
        this.matchDuration = matchDuration;
        this.isMatchActive = false;
        this.timer = new Timer();
    }

    // Getters
    public Integer getId() {return id;}

    public List<User> getUsers() {return users;}

    public Problem getProblem() {return problem;}

    public Timer getTimer() {return timer;}

    public long getMatchDuration() {return matchDuration;}

    public boolean isMatchActive() {return isMatchActive;}

    // Setters
    public void setUsers(List<User> users) {this.users = users;}

    public void setProblem(Problem problem) {this.problem = problem;}

    public void setTimer(Timer timer) {this.timer = timer;}

    public void setMatchDuration(long matchDuration) {this.matchDuration = matchDuration;}

    public void setMatchActive(boolean matchActive) {isMatchActive = matchActive;}




}
