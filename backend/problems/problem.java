public class Problem {
    // Attributes
    private String title = "";
    private String description = "";
    private String difficulty = "";
    private List<Object[]> testCases = {};
    // Constructor
    public Problem() {}
    // Setters
    public void setTitle(String title) {this.title = title;}

    public void setDescription(String description) {this.description = description;}

    public void setDifficulty(String difficulty) {this.difficulty = difficulty;}

    public void setTestCaseNums(List<Object[]> testCases) {this.testCases = testCaseNums;}

    public void setTarget(int target) {this.target = target;}

    // Getters
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

    public int getTarget() {
        return target;
    }
}
