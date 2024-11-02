import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class Match {
    // Attributes
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

    // Start the match
    public void startMatch() {
        if (!isMatchActive) {
            isMatchActive = true;
            System.out.println("Match started between " + users.get(0).getUsername() + " and " + users.get(1).getUsername() + ".");
            System.out.println("Problem: " + problem.getTitle());
            startTimer();
        } else {
            System.out.println("Match is already active.");
        }
    }

    // End the match
    public void endMatch() {
        if (isMatchActive) {
            isMatchActive = false;
            timer.cancel();
            System.out.println("Match ended between " + users.get(0).getUsername() + " and " + users.get(1).getUsername() + ".");
            calculateWinner();
        } else {
            System.out.println("Match is not active.");
        }
    }

    // Calculate the winner based on the solution submissions (dummy implementation)
    public void calculateWinner() {
        System.out.println("Calculating winner...");
        // Placeholder: real implementation would involve comparing solution accuracy and timing
        // Here we could simulate a winner
        User winner = users.get(0);  // Placeholder logic: always selects the first user as winner
        System.out.println("Winner is: " + winner.getUsername());
    }

    // Start the timer for the match
    private void startTimer() {
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("Time's up! Ending match.");
                endMatch();
            }
        }, matchDuration);
    }

    // Getters and setters
    public List<User> getUsers() {
        return users;
    }

    public Problem getProblem() {
        return problem;
    }

    public boolean isMatchActive() {
        return isMatchActive;
    }
}
