public class User {
    // Attributes
    private String username;
    private String password;
    private String emailAddress;
    private boolean isLoggedIn;

    // Constructor
    public User(String username, String password, String emailAddress) {
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.isLoggedIn = false; // User starts as logged out
    }

    // Methods
    public boolean register(String username, String password, String emailAddress) {
        // Assume a registration system that checks if the user already exists
        // Here we would normally interact with a database or system storage.
        System.out.println("User " + username + " registered successfully.");
        return true; // Simplified for demonstration
    }

    public boolean login(String username, String password) {
        // Simplified logic: check if username and password match
        if (this.username.equals(username) && this.password.equals(password)) {
            this.isLoggedIn = true;
            System.out.println("User " + username + " logged in successfully.");
            return true;
        } else {
            System.out.println("Invalid username or password.");
            return false;
        }
    }

    public void logout() {
        if (isLoggedIn) {
            this.isLoggedIn = false;
            System.out.println("User " + username + " logged out successfully.");
        } else {
            System.out.println("User is already logged out.");
        }
    }

    public void accessEditor() {
        if (isLoggedIn) {
            System.out.println("Accessing code editor...");
            // Code to access editor would go here
        } else {
            System.out.println("Please log in to access the code editor.");
        }
    }

    public void startMatch() {
        if (isLoggedIn) {
            System.out.println("Starting a new match...");
            // Code to start a match would go here
        } else {
            System.out.println("Please log in to start a match.");
        }
    }

    public void submitSolution() {
        if (isLoggedIn) {
            System.out.println("Solution submitted.");
            // Code to submit the solution would go here
        } else {
            System.out.println("Please log in to submit your solution.");
        }
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    // Setters (optional depending on if you want to allow changing these)
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
