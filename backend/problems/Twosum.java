import java.util.*

public class TwoSum {
    // Instance of Problem
    private Problem problem;

    // Attributes
    private String title = "Two Sum";
    private String description = "Given an array of integers, return indices of the two numbers such that they add up to a specific target.";
    private String difficulty = "Easy";
    private List<Object[]> testCases; // List of test cases
    private int target = 9; // Example target

    // Constructor
    public TwoSum() {
        // Initialize test cases
        testCases = new ArrayList<>();
        testCases.add(new Object[] { new int[]{2, 7, 11, 15}, target });

        // Initialize Problem instance with specific attributes
        problem = new Problem();
        problem.setTitle(title);
        problem.setDescription(description);
        problem.setDifficulty(difficulty);
        problem.setTestCases(testCases);
    }

    // Additional methods as needed...
}
