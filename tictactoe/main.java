import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;

class TicTacToe {
    private static final String HUMAN_SYMBOL = "X";
    private static final String COMPUTER_SYMBOL = "O";
    private static final int LAST_TURN = 9;

    private int turnCount = 0;
    private Boolean foundWinner = false;
    private Boolean isHuman = true;

    private Random randomGenerator = new Random();
    private Scanner keyboardInput = new Scanner(System.in);

    private int[][][] winningArray = new int[9][][];
    private Map<String, String> boardData = new HashMap<String, String>();

    // Set up our winning combination lookup and default state of the board as well as
    // intructions for the human player.
    private void init(){
        System.out.println("Welcome to Tic Tac Toe, enter numbers (1-9) to try to place " +
                "\nthree consecutive markers in the field to win. You will be X's " +
                "\nand the computer will be O's. Here is a guide to the numbers " +
                "\nand their position on the board:");
        System.out.println();
        System.out.println( "1 | 2 | 3");
        System.out.println("---------");
        System.out.println( "4 | 5 | 6");
        System.out.println("---------");
        System.out.println( "7 | 8 | 9");
        System.out.println();
        System.out.println("Let's begin! (You always go first.)");
        System.out.println("==============================================================");

        // Populate the map of winning combos.
        this.winningArray[0] = new int[][]{new int[]{2,3}, new int[]{5,9}, new int[]{4,7}};
        this.winningArray[1] = new int[][]{new int[]{1,3}, new int[]{5,8}};
        this.winningArray[2] = new int[][]{new int[]{1,2}, new int[]{5,7}, new int[]{6,9}};
        this.winningArray[3] = new int[][]{new int[]{1,7}, new int[]{5, 6}};
        this.winningArray[4] = new int[][]{new int[]{1,9}, new int[]{2,8}, new int[]{3,7}, new int[]{4,6}};
        this.winningArray[5] = new int[][]{new int[]{3,9}, new int[]{4,5}};
        this.winningArray[6] = new int[][]{new int[]{1,4}, new int[]{3,5}, new int[]{8,9}};
        this.winningArray[7] = new int[][]{new int[]{2,5}, new int[]{7,9}};
        this.winningArray[8] = new int[][]{new int[]{1,5}, new int[]{3,6}, new int[]{7,8}};

        // Populate the board's default state
        this.boardData.put("1", "?");
        this.boardData.put("2", "?");
        this.boardData.put("3", "?");
        this.boardData.put("4", "?");
        this.boardData.put("5", "?");
        this.boardData.put("6", "?");
        this.boardData.put("7", "?");
        this.boardData.put("8", "?");
        this.boardData.put("9", "?");
    }

    // Checks the space specified to see if we are able to use it. Returns true if action
    // is successful or false if the space is already filled
    private Boolean fillSpace(String location) {
        String playerSymbol = this.isHuman ? HUMAN_SYMBOL : COMPUTER_SYMBOL;

        // Make sure the space we want to fill is empty
        if(this.boardData.get(location) == "?") {
            this.boardData.put(location, playerSymbol);
            this.printBoard();
            this.checkWin(location, playerSymbol);

            return true;
        }

        // We only want to show this for user input.
        if(this.isHuman){
            System.out.println("Invalid move, please pick again.");
        }

        return false;
    }

    // Logic for the steps to go through for checking a win.
    private void checkWin(String location, String playerSymbol) {

        this.turnCount++;

        // Don't even bother checking for a win since it's not possible
        // to have a win before turn 4.
        if(this.turnCount > 4) {
            int index = Integer.parseInt(location) - 1;
            int[][] arrayToCheck = this.winningArray[index];

            // Check the lookup for a possible win
            if(this.checkLookup(arrayToCheck, playerSymbol)) {
                //We found our winner
                System.out.println("Player " + playerSymbol + " is the Winner!");
                this.foundWinner = true;
                return;
            }

            if(this.turnCount == LAST_TURN) {
                System.out.println("No more turns left, It's a tie!");
            }
        }
    }

    // Checks the lookup to see if there are possible wins. Returns true if there is a winner
    // or false if not.
    private Boolean checkLookup(int[][] arrayToCheck, String playerSymbol) {
        // Go through the 2nd array (the array of winning combinations)
        for(int i = 0; i < arrayToCheck.length; i++) {
            // Go through the 3rd array (each individual pair of numbers required for a win)
            for(int j = 0; j < arrayToCheck[i].length; j++){
                String squareSymbol = this.boardData.get(Integer.toString(arrayToCheck[i][j]));

                // Break the loop if we don't have a matching symbol.
                if(!squareSymbol.equals(playerSymbol)) {
                    break;
                } else if(j == 1){
                    return true;
                }
            }
        }

        return false;
    }

    private void takeTurn() {
        Boolean validInput = false;
        String playerSymbol = this.isHuman ? HUMAN_SYMBOL : COMPUTER_SYMBOL;
        String location;

        if(this.isHuman) {
            location = this.prompt();
        } else {
            location = "" + (randomGenerator.nextInt(10) + 1);
        }

        System.out.println("Player " + playerSymbol + "'s turn...");

        while(!validInput) {
            validInput = this.fillSpace(location);

            // Keep asking until we get a valid answer
            if(!validInput){
                if(this.isHuman) {
                    location = this.prompt();
                } else {
                    location = "" + (randomGenerator.nextInt(10) + 1);
                }
            }
        }

        this.isHuman = !this.isHuman;
    }

    // Asks a user for input
    public String prompt() {
        this.printBoard();
        System.out.println("Enter a location (1-9):");

        return this.keyboardInput.nextLine();
    }

    // Prints the state of the board at the time it is called.
    public void printBoard() {
        System.out.println();
        System.out.println( this.boardData.get("1") + " | " + this.boardData.get("2") + " | " + this.boardData.get("3"));
        System.out.println("---------");
        System.out.println( this.boardData.get("4") + " | " + this.boardData.get("5") + " | " + this.boardData.get("6"));
        System.out.println("---------");
        System.out.println(this.boardData.get("7") + " | " + this.boardData.get("8") + " | " + this.boardData.get("9"));
        System.out.println();
    }

    // Return status of the game. Are there still turns we need to take?
    public Boolean isRunning() {
        return (turnCount < LAST_TURN) && !foundWinner;
    }

    public static void main(String[] args){
        TicTacToe game = new TicTacToe();

        game.init();

        while(game.isRunning()) {
            game.takeTurn();
        }
    }
}


