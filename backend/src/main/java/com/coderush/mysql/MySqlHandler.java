package com.coderush.mysql;

import java.io.FileReader;
import java.sql.*;
import java.util.*;

/**
 * Handles all interactions with the aiven mysql database.
 */
public class MySqlHandler {
    private static Connection connection = null;
    private static Statement statement = null;
    private static ResultSet resultSet = null;
    private static PreparedStatement preparedStatement = null;

    /**
     * Adds a new user to the database.
     * @param username up to 16 characters.
     * @param passwordHash up to 60 characters intended for bcrypt.
     * @param email up to 32 characters.
     * @return true if user was added or false if not.
     */
    public static boolean addUser(String username, String passwordHash, String email){
        boolean tf = false;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("insert into usert values (?, ?, ?, ?)");
                preparedStatement.setString(1, username);
                preparedStatement.setString(2, passwordHash);
                preparedStatement.setString(3, email);
                preparedStatement.setInt(4, 0);
                preparedStatement.execute();
                tf = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return tf;
    }

    /**
     * Adds a problem to the database.
     * @param problemNum provided problem number
     * @param title
     * @param description
     * @param difficulty 'Hard', 'Medium', or 'Easy'
     * @return true if problem was added or false if not.
     */
    protected static boolean addProblem(int problemNum, String title, String description, String difficulty){
        boolean tf = false;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("insert into problems values (?, ?, ?, ?, null)");
                preparedStatement.setInt(1, problemNum);
                preparedStatement.setString(2, title);
                preparedStatement.setString(3, description);
                preparedStatement.setString(4, difficulty.toUpperCase());
                preparedStatement.execute();
                tf = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return tf;
    }

    /**
     * Adds the starting code to the problems table
     * @param problemNum the problem number.
     * @param startingCode
     * @return true on successful update.
     */
    protected static boolean addStartingCode(int problemNum, String startingCode){
        boolean tf = false;
        if(connection != null || connectToDatabase()){
            try {
                PreparedStatement ps;
                ps = connection.prepareStatement("UPDATE problems SET startingcode = ? WHERE problemid = ?");
                ps.setString(1, startingCode);
                ps.setInt(2, problemNum);
                ps.execute();
                tf = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return tf;
    }

    /**
     * Retrieves the starting code for a given problem.
     * @param problemNum the problem number.
     * @return string representation of starting code.
     */
    public static String getStartingCode(int problemNum){
        ResultSet rs;
        String results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT startingcode FROM problems WHERE problemid = ?");
                preparedStatement.setInt(1, problemNum);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results = rs.getString("startingcode");
                }
                if(results != null)
                    results = results.replaceAll("NEWLINE", "\n");
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Default get top 50 rows of users.
     * @return top 50 rows as an Arraylist of Arraylists of Strings.
     */
    protected static ArrayList<ArrayList<String>> getLeaderboard(){
        return getLeaderboard(50);
    }

    /**
     * Get top numRows rows of users ordered by total score.
     * @param numRows number of rows to retrieve.
     * @return top 50 rows as an Arraylist of Arraylists of Strings.
     */
    public static ArrayList<ArrayList<String>> getLeaderboard(int numRows){
        ResultSet rs;
        ArrayList<ArrayList<String>> results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT username, totalscore FROM usert ORDER BY totalscore DESC LIMIT ?");
                preparedStatement.setInt(1, numRows);
                rs = preparedStatement.executeQuery();
                results = new ArrayList<>();
                while(rs.next()){
                    ArrayList<String> row = new ArrayList<>();
                    row.add(rs.getString("username"));
                    row.add(rs.getString("totalscore"));
                    results.add(row);
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Adds the provided score to the user's current score.
     * @param username
     * @param addScore The value to add to the user's score.
     * @return true on successful update.
     */
    public static boolean updateScore(String username, int addScore){
        boolean tf = false;
        if(connection != null || connectToDatabase()){
            try {
                PreparedStatement ps;
                ps = connection.prepareStatement("UPDATE usert SET totalscore = totalscore + ? WHERE username = ?");
                ps.setInt(1, addScore);
                ps.setString(2, username);
                ps.execute();
                tf = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return tf;
    }

    /**
     * Sets user's score to the provided score.
     * @param username
     * @param newScore The new total score for the user.
     * @return true on successful update.
     */
    protected static boolean newScore(String username, int newScore){
        boolean tf = false;
        if(connection != null || connectToDatabase()){
            try {
                PreparedStatement ps;
                ps = connection.prepareStatement("UPDATE usert SET totalscore = ? WHERE username = ?");
                ps.setInt(1, newScore);
                ps.setString(2, username);
                ps.execute();
                tf = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return tf;
    }

    /**
     * Adds a versus match to the table. Also updates the player scores. Should complete atomically.
     * @param username1
     * @param username2
     * @param problem number of the problem.
     * @param score1 the score to add to the player's total score.
     * @param score2 the score to add to the player's total score.
     * @return index of versus game or -1 if the addition failed.
     */
    public static int addVS(String username1, String username2, int problem, int score1, int score2){
        int index = -1;
        PreparedStatement addVersus, update1, update2, getIndex;
        if(connection != null || connectToDatabase()){
            try {
                connection.setAutoCommit(false);
                addVersus = connection.prepareStatement("insert into gamevs (usera, userb, userascore, userbscore, problem) values (?, ?, ?, ?, ?)");
                addVersus.setString(1, username1);
                addVersus.setString(2, username2);
                addVersus.setInt(3, score1);
                addVersus.setInt(4, score2);
                addVersus.setInt(5, problem);
                addVersus.execute();
                update1 = connection.prepareStatement("UPDATE usert SET totalscore = totalscore + ? WHERE username = ?");
                update1.setInt(1, score1);
                update1.setString(2, username1);
                update1.execute();
                update2 = connection.prepareStatement("UPDATE usert SET totalscore = totalscore + ? WHERE username = ?");
                update2.setInt(1, score1);
                update2.setString(2, username1);
                update2.execute();
                getIndex = connection.prepareStatement("SELECT gameid FROM gamevs ORDER BY gameid DESC LIMIT 1");
                ResultSet rs = getIndex.executeQuery();
                index = rs.getInt("gameid");
                connection.commit();
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return index;
    }

    /**
     * Adds a solo match to the table. Also updates the player score. Should complete atomically.
     * @param username
     * @param problem number of the problem.
     * @param score the score to add to the player's total score.
     * @return index of versus game or -1 if the addition failed
     */
    public static int addSolo(String username, int problem, int score){
        int index = -1;
        PreparedStatement addVersus, update, getIndex;
        if(connection != null || connectToDatabase()){
            try {
                connection.setAutoCommit(false);
                addVersus = connection.prepareStatement("insert into gamesolo (usera, userscore, problem) values (?, ?, ?)");
                addVersus.setString(1, username);
                addVersus.setInt(2, score);
                addVersus.setInt(3, problem);
                addVersus.execute();
                update = connection.prepareStatement("UPDATE usert SET totalscore = totalscore + ? WHERE username = ?");
                update.setInt(1, score);
                update.setString(2, username);
                update.execute();
                getIndex = connection.prepareStatement("SELECT gameid FROM gamesolo ORDER BY gameid DESC LIMIT 1");
                ResultSet rs = getIndex.executeQuery();
                index = rs.getInt("gameid");
                connection.commit();
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return index;
    }

    /**
     * Gets problem information.
     * @param id The id of the Problem.
     * @return String[] with {title, description, difficulty}
     */
    public static String[] getProblem(int id){
        ResultSet rs;
        String[] results = {null, null, null};
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT title, description, difficulty FROM problems WHERE problemid = ?");
                preparedStatement.setInt(1, id);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results[0] = rs.getString("title");
                    results[1] = rs.getString("description");
                    results[2] = rs.getString("difficulty");
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Gets a provided user's total score.
     * @param username
     * @return The user's score or -1 for an error.
     */
    public static int getUserScore(String username){
        ResultSet rs;
        int results = -1;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT totalscore FROM usert WHERE username = ?");
                preparedStatement.setString(1, username);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results = rs.getInt("totalscore");
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Gets the user's email.
     * @param username
     * @return String of the user's email or null on a failure.
     */
    public static String getUserEmail(String username){
        ResultSet rs;
        String results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT email FROM usert WHERE username = ?");
                preparedStatement.setString(1, username);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results = rs.getString("email");
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Gets the username from an email.
     * @param email
     * @return String of the username or null on a failure.
     */
    public static String getUsernameFromEmail(String email){
        ResultSet rs;
        String results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT username FROM usert WHERE email = ?");
                preparedStatement.setString(1, email);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results = rs.getString("email");
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Resets the user's password.
     * @param username
     * @param newPasswordHash up to 60 characters intended for bcrypt.
     * @return true on success or false for failure.
     */
    public static boolean resetPassword(String username, String newPasswordHash){
        boolean results = false;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("UPDATE usert SET passhash = ? WHERE username = ?");
                preparedStatement.setString(1, newPasswordHash);
                preparedStatement.setString(2, username);
                preparedStatement.execute();
                results = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Changes the user's email.
     * @param username
     * @param newEmail new email, limited to 32 characters.
     * @return true on success or false for failure.
     */
    public static boolean changeEmail(String username, String newEmail){
        boolean results = false;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("UPDATE usert SET email = ? WHERE username = ?");
                preparedStatement.setString(1, newEmail);
                preparedStatement.setString(2, username);
                preparedStatement.execute();
                results = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    /**
     * Gets the user's password hash for login.
     * @param username
     * @return password hash or null on failure.
     */
    public static String getPasswordHash(String username){
        ResultSet rs;
        String results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT passhash FROM usert WHERE username = ?");
                preparedStatement.setString(1, username);
                rs = preparedStatement.executeQuery();
                while(rs.next()){
                    results = rs.getString("passhash");
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }



    /**
     * Removes a user from the database along with their solo games. Also removes their username from VS games.
     * @param username
     * @return true if user is removed.
     */
    public static boolean removeUser(String username){
        boolean results = false;
        PreparedStatement removeUser, setUser1, setUser2;
        if(connection != null || connectToDatabase()){
            try {
                connection.setAutoCommit(false);
                removeUser = connection.prepareStatement("DELETE FROM usert WHERE username = ?");
                removeUser.setString(1, username);
                removeUser.execute();
                setUser1 = connection.prepareStatement("UPDATE gamevs SET usera = NULL WHERE usera = ?");
                setUser1.setString(1, username);
                setUser1.execute();
                setUser2 = connection.prepareStatement("UPDATE gamevs SET userb = NULL WHERE userb = ?");
                setUser2.setString(1, username);
                setUser2.execute();
                connection.commit();
                results = true;
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }

    public static ArrayList<ArrayList<String>> getTestCases(int problemid){
        ResultSet rs;
        ArrayList<ArrayList<String>> results = null;
        if(connection != null || connectToDatabase()){
            try {
                preparedStatement = connection.prepareStatement("SELECT input, output FROM testcases WHERE problemid = ?");
                preparedStatement.setInt(1, problemid);
                rs = preparedStatement.executeQuery();
                results = new ArrayList<>();
                while(rs.next()){
                    ArrayList<String> row = new ArrayList<>();
                    row.add(rs.getString("input"));
                    row.add(rs.getString("output"));
                    results.add(row);
                }
            }
            catch(Exception e){
                e.printStackTrace();
            }
            finally {
                closeConnection();
            }
        }
        return results;
    }


    private static boolean connectToDatabase(){
        FileReader reader;
        Properties p;
        try{
            reader = new FileReader(".\\backend\\src\\main\\resources\\sqlconfig.properties");
            p = new Properties();
            p.load(reader);
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }


        try {
            connection = DriverManager.getConnection("jdbc:mysql://" + p.getProperty("host") + ":" + p.getProperty("port") + "/" + p.getProperty("databaseName") + "?sslmode=require", p.getProperty("userName"), p.getProperty("password"));
            statement = connection.createStatement();
            resultSet = statement.executeQuery("SELECT version() AS version");

            while (resultSet.next()) {
//                System.out.println("Version: " + resultSet.getString("version"));
            }
            return true;
        }
        catch (SQLException e) {
            System.out.println("Connection failure.");
            e.printStackTrace();
            return false;
        }
    }

    private static void closeConnection(){
        try{connection.close();}
        catch(Exception e){
            System.out.println("error closing connection");
        }
        connection = null;
    }
}