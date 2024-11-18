import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import static java.lang.Integer.parseInt;

public class ProblemReader {
    public static void reader(String fileLocation) {
        File folder = new File(fileLocation);
        File[] listOfFiles = folder.listFiles();

        for (File file : listOfFiles) {
            if (file.isFile()) {
                String name = file.getName();
                if(name.substring(name.length()-3).equals("txt")){
                    try {
                        Scanner scnr = new Scanner(file);
                        int problemNum = parseInt(scnr.nextLine());
                        String startingCode = "";
                        MySqlHandler.addProblem(problemNum, scnr.nextLine(), scnr.nextLine(), scnr.nextLine());
                        while(scnr.hasNextLine()){
                            startingCode += scnr.nextLine() + "NEWLINE";
                        }
                        MySqlHandler.addStartingCode(problemNum, startingCode);
                        scnr.close();
                    }
                    catch(FileNotFoundException e){
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
