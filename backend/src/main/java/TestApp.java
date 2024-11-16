import com.coderush.checker.Checker;
import com.coderush.codeeditor.CodeEditorService;
import com.coderush.match.MatchService;
import com.coderush.mysql.MySqlHandler;
import com.coderush.problem.Problem;
import com.coderush.problem.TestCase;
import com.coderush.practice.Practice;
import com.coderush.solution.Solution;
import com.coderush.user.User;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TestApp {

    public static void main(String[] args) {

        // Manually instantiate services and classes (without Spring)
        Checker checker = new Checker();
        CodeEditorService codeEditorService = new CodeEditorService();
        MatchService matchService = new MatchService();

        // Create a problem with test cases

        String[] problemSQL = MySqlHandler.getProblem(1);
        Problem problem = new Problem();
        problem.setTitle(problemSQL[0]);
        problem.setDescription(problemSQL[1]);
        problem.setDifficulty(problemSQL[2]);
        problem.setTestCases(Arrays.asList(
                new TestCase("1,2", "3"),
                new TestCase("3,4", "7")
        ));

        MySqlHandler.getStartingCode(1);

        // Use MysqlHandler to add users to the database
        User user1 = new User();
        user1.setUsername("user1");
        user1.setPassword("password123");
        user1.setEmail("user1@example.com");

        User user2 = new User();
        user2.setUsername("user2");
        user2.setPassword("password098");
        user2.setEmail("user2@example.com");

        MySqlHandler.addUser(user1.getUsername(),user1.getPassword(),user1.getEmail()); // Add user1 to the database
        MySqlHandler.addUser(user2.getUsername(),user2.getPassword(),user2.getEmail()); // Add user2 to the database

        // Fetch users from the database (optional, if needed for any logic)
        // List<User> usersFromDb = mysqlHandler.getAllUsers();
        // User user1 = usersFromDb.get(0); // Example of fetching users

        // Start a match and set users and problem
        matchService.setUsers(Arrays.asList(user1, user2));
        //MySqlHandler.addVS(user1.getUsername(), user2.getUsername(), 1, user1.getScore(), user2.getScore());
        matchService.setProblem(problem);

        // Start the match
        String matchStartMessage = matchService.startMatch();
        System.out.println(matchStartMessage);

        // Simulate the users solving the problem by running code solutions
        Solution solution1 = new Solution("return a + b;"); // User 1's code
        Solution solution2 = new Solution("return a - b;"); // User 2's code

        // Run the test cases using the Checker class
        boolean resultUser1 = checker.runTestCases(solution1, problem);
        boolean resultUser2 = checker.runTestCases(solution2, problem);

        // Print results for User 1
        System.out.println("User 1 test results: " + (resultUser1 ? "Passed" : "Failed"));

        // Print results for User 2
        System.out.println("User 2 test results: " + (resultUser2 ? "Passed" : "Failed"));

        // End the match and calculate the winner
        String matchEndMessage = matchService.endMatch();
        System.out.println(matchEndMessage);
        matchService.calculateWinner(); // Assuming this logic will pick the winner based on scores


        // Simulate practice mode for User 1 (without timer or user-versus-user)
        Practice practice = new Practice();
        //MySqlHandler.addSolo(user1.getUsername(), 1, user1.getScore());
        practice.setUser(user1); // Only one user in practice mode
        practice.setProblem(problem);
        System.out.println("Practice session started for " + user1.getUsername());

        // In practice mode, the user will solve the problem similarly to the match
        // Simulate running code in practice mode
        boolean resultPracticeUser1 = checker.runTestCases(solution1, problem);
        System.out.println("Practice session result for " + user1.getUsername() + ": " + (resultPracticeUser1 ? "Passed" : "Failed"));

        // Optionally, you could add code for running more test cases, creating different problems, etc.

        MySqlHandler.removeUser(user1.getUsername());
        MySqlHandler.removeUser(user2.getUsername());
    }
}
