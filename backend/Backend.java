import java.util.ArrayList;
import java.util.List;

public class Backend {
    public static void main(String[] args) {
        // Step 1: User registers and logs in
        User user1 = new User("john_doe", "password123", "john@example.com");
        user1.register();
        user1.login();

        // Step 2: Set up the Two Sum Problem with test cases
        List<Object[]> testCases = new ArrayList<>();
        testCases.add(new Object[] { new int[]{2, 7, 11, 15}, 9 });  // Expected output: [0, 1]

        Problem twoSumProblem = new Problem("Two Sum",
                "Given an array of integers, return indices of the two numbers that add up to a specific target.",
                "Easy",
                testCases);

        // Step 3: User accesses the code editor and loads a code template
        CodeEditor codeEditor = new CodeEditor();
        user1.accessEditor(codeEditor);
        codeEditor.loadTemplate("public int[] twoSum(int[] nums, int target) { ... }");

        // Step 4: User writes a solution and submits it
        String userSolutionCode = "public int[] twoSum(int[] nums, int target) { for (int i = 0; i < nums.length; i++) { for (int j = i + 1; j < nums.length; j++) { if (nums[i] + nums[j] == target) { return new int[]{i, j}; } } } return null; }";
        codeEditor.editCode(userSolutionCode);

        // Step 5: Solution object takes user's code and runs test cases
        Solution userSolution = new Solution(userSolutionCode);
        System.out.println("Testing solution for Two Sum problem...");

        boolean allPassed = true;
        for (Object[] testCase : twoSumProblem.getTestCaseNums()) {
            int[] nums = (int[]) testCase[0];
            int target = (int) testCase[1];

            // Evaluate solution with each test case
            boolean result = userSolution.runTestCase(nums, target, twoSumProblem);
            if (result) {
                System.out.println("Test case passed for input: " + arrayToString(nums) + " and target: " + target);
            } else {
                System.out.println("Test case failed for input: " + arrayToString(nums) + " and target: " + target);
                allPassed = false;
            }
        }

        System.out.println(allPassed ? "All test cases passed!" : "Some test cases failed.");

        // Step 6: Start a match between two users
        User user2 = new User("jane_doe", "securepassword", "jane@example.com");
        user2.register();
        user2.login();

        Match match = new Match(user1, user2, twoSumProblem);
        match.startMatch();

        // Timer simulation (for example purposes, we won’t use actual threading here)
        System.out.println("Match started between " + user1.getUsername() + " and " + user2.getUsername());
        user1.startMatch(match);
        user1.submitSolution();
        user2.startMatch(match);
        user2.submitSolution();

        match.endMatch();
        User winner = match.calculateWinner();
        System.out.println("Winner of the match: " + (winner != null ? winner.getUsername() : "It's a tie!"));
    }

    // Helper method to convert array to string
    private static String arrayToString(int[] array) {
        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < array.length; i++) {
            sb.append(array[i]);
            if (i < array.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}
