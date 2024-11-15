

public class SqlTester {
    private final static String fileLoc = "C:\\Users\\asoma\\IdeaProjects\\CodeRush\\backend\\src\\main\\resources\\problems";

    public static void  main(String[] args){
        MySqlHandler.addUser("Tommy","zsiurgnglzbrouigybaw4daf","sdjfhfasjkh@askjdha.sad");
        MySqlHandler.addUser("Wellington","sdgawetwa4r3edsfweaf","awefasd@askaweajdha.sad");
        MySqlHandler.addUser("NICK","shefrhsdryergrsdrgter","asassdaw@askaweajdha.sad");
        MySqlHandler.addUser("Reaact","yhwraryhaweryh","awefasd@askaweajdha.sad");

        ProblemReader.reader(fileLoc);


    }
}