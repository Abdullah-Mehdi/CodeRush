package com.coderush.mysql;

import java.util.ArrayList;
import java.util.List;

public class SqlTester {
    private final static String fileLoc = "C:\\Users\\asoma\\IdeaProjects\\CodeRush\\backend\\src\\main\\resources\\problems";

    public static void  main(String[] args){
        /*
        MySqlHandler.removeUser("Tommy");
        MySqlHandler.removeUser("Wellington");
        MySqlHandler.removeUser("NICK");
        MySqlHandler.removeUser("Reaact");

        MySqlHandler.addUser("Tommy","zsiurgnglzbrouigybaw4daf","sdjfhfasjkh@askjdha.sad");
        MySqlHandler.addUser("Wellington","sdgawetwa4r3edsfweaf","zimbbbaa@sosososo.sad");
        MySqlHandler.addUser("NICK","shefrhsdryergrsdrgter","asassdaw@askaweajdha.sad");
        MySqlHandler.addUser("Reaact","yhwraryhaweryh","awefasd@askaweajdha.sad");
        */

//        for(int i = 0; i <3; i++) {
//            System.out.println(MySqlHandler.getProblem(1)[i]);
//        }
//        System.out.println(MySqlHandler.getStartingCode(1));
//        //MySqlHandler.addSolo("Tommy",1,0);
//
//        int numRows = 50;
//
//        // Get the leaderboard
//        ArrayList<ArrayList<String>> leaderboard = MySqlHandler.getLeaderboard(numRows);
//
//        // Print out the results
//        System.out.println("Leaderboard:");
//        for (List<String> row : leaderboard) {
//            String username = row.get(0); // username at index 0
//            String score = row.get(1); // score at index 1
//            System.out.println(username + " - " + score);
//        }

        ArrayList<ArrayList<String>> testCases = MySqlHandler.getTestCases(9);

        for(ArrayList<String> test : testCases){
            for(String str : test){
                System.out.print(str + " ");
            }
            System.out.println();
        }

    }
}