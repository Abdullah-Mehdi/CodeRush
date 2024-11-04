public class Problem {
    // Attributes
    private String id = "";
    private String title = "";
    private String description = "";
    private String difficulty = "";
    private List<Object[]> testCases = {};
    // Constructor
    public Problem(String description, String title, String id, String difficulty, List<Object[]> testCases) {
        this.description = description;
        this.title = title;
        this.id = id;
        this.difficulty = difficulty;
        this.testCases = testCases;
    }

    public void setId(String id) {this.id = id;}

    public void setTitle(String title) {this.title = title;}

    public void setDescription(String description) {this.description = description;}

    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

    public void setTestCases(List<Object[]> testCases) {this.testCases = testCases;}

    public void setTarget(int target) {this.target = target;}

    // Getters
    public String getId() {return id;}

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public List<Object[]> getTestCases() {
        return testCases;
    }
}
