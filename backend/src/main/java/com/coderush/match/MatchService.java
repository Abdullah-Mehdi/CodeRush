/* package com.coderush.match;

import com.coderush.problem.Problem;
import com.coderush.problem.ProblemService;
import com.coderush.user.User;
import lombok.NoArgsConstructor;
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

    public void setUsers(List<User> users) {
        if (users == null || users.size() < 2) {
            throw new IllegalArgumentException("At least two users are required to start a match.");
        }
        this.users = users;
    }

    public MatchService() {}

    // Inject ProblemService for problem management
    private ProblemService problemService;

    public MatchService(ProblemService problemService) {
        this.problemService = problemService;
    }

    public String startMatch() {
        if (!isMatchActive && users != null && users.size() >= 2) {
            isMatchActive = true;
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

    // Calculates the winner (placeholder logic)
    public void calculateWinner() {
        if (users.size() == 2) {
            User user1 = users.get(0);
            User user2 = users.get(1);

            System.out.println("Calculating winner based on scores...");
            System.out.println(user1.getUsername() + "'s score: " + user1.getScore());
            System.out.println(user2.getUsername() + "'s score: " + user2.getScore());


            User winner;
            if (user1.getScore() > user2.getScore()) {
                winner = user1;
            } else if (user1.getScore() < user2.getScore()) {
                winner = user2;
            } else {
                System.out.println("It's a tie!");
                return; // Exit if it's a tie
            }
        System.out.println("Winner is: " + winner.getUsername());
    } else {
        System.out.println("Insufficient users to calculate winner.");
    }
    }

    // Starts a timer for the match
    private void startTimer() {
        try {
            timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    System.out.println("Time's up! Ending match.");
                    endMatch();
                }
            }, MATCH_DURATION);
        } catch (Exception e) {
            System.err.println("Error starting the timer: " + e.getMessage());
            isMatchActive = false;
        }
    }

    // Sets the problem for the match
    public synchronized void setProblem(Problem selectedProblem) {
        if (selectedProblem == null) {
            throw new IllegalArgumentException("A valid problem must be selected.");
        }
        this.problem = selectedProblem;
    }
}
 */