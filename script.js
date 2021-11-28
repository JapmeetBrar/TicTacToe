const GameBoard = (function() {
    let board = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"]];
    
    return {
        board
    };
})();

const DisplayController = (function(){
    const writeToBoard = (player, position) => {
        let square = document.querySelector(`[data-square = "${position}"]`);
        if (square.textContent !== "") return;
        console.log("written")
        square.textContent = "X"
    }
    return {writeToBoard};
})();

const Player = (name) =>{
    const getName = () => console.log("Hi I am " + name);

    return{
        getName
    };
}

console.log(GameBoard.board);

let jap = Player('jap');

DisplayController.writeToBoard(jap, 8)