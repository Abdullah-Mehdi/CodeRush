package com.coderush.match;

import com.coderush.problem.Problem;
import com.coderush.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class MatchService {

    private List<User> users;
    private Problem problem;
    private boolean isMatchActive = false;
    private Timer timer;
    private static final long MATCH_DURATION = 60000; // 1-minute match duration

    public String startMatch() {
        if (!isMatchActive && users != null && users.size() >= 2) {
            isMatchActive = true;
            problem = getProblemForMatch();  // Fetch a problem for the match
            System.out.println("Match started between " + users.get(0).getUsername() + " and " + users.get(1).getUsername() + ".");
            System.out.println("Problem: " + problem.getTitle());
            startTimer();
            return "Match started successfully";
        } else if (isMatchActive) {
            return "Match is already active.";
        } else {
            return "Not enough users to start a match.";
        }
    }

    public String endMatch() {
        if (isMatchActive) {
            isMatchActive = false;
            timer.cancel();
            System.out.println("Match ended between " + users.get(0).getUsername() + " and " + users.get(1).getUsername() + ".");
            calculateWinner();
            return "Match ended successfully";
        } else {
            return "Match is not active.";
        }
    }

    // Calculates a winner (dummy logic)
    public void calculateWinner() {
        System.out.println("Calculating winner...");
        // Placeholder logic: always selects the first user as the winner
        User winner = users.get(0);
        System.out.println("Winner is: " + winner.getUsername());
    }

    // Starts a timer for the match
    private void startTimer() {
        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("Time's up! Ending match.");
                endMatch();
            }
        }, MATCH_DURATION);
    }

    // Placeholder method for assigning a problem to the match
    private Problem getProblemForMatch() {
        // Logic to fetch a problem; return dummy data here for now
        Problem sampleProblem = new Problem();
        sampleProblem.setTitle("Two Sum");
        sampleProblem.setDescription("Find two numbers that add up to a specific target.");
        return sampleProblem;
    }

    // Setter for users list, to simulate adding users to the match
    public void setUsers(List<User> users) {
        this.users = users;
    }
}
