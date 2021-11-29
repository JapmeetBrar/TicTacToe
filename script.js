const GameBoard = (function() {
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];
    
    return {
        board
    };
})();

const DisplayController = (function(){
    const writeToBoard = (player, position) => {
        let square = document.querySelector(`[data-square = "${position}"]`);
        
        square.textContent = player.symbol;
    }
    return {writeToBoard};
})();

const mainGame = (function(){
    let squares = document.querySelectorAll('.block');
    let player1Move = true;

    squares.forEach((square)=>{
        square.addEventListener('click', ()=>{
            (player1Move)?_playMove(player1, square):_playMove(player2, square)
        })
    })

    const _playMove = (player, square) => {
        if (square.textContent !== "") return;
        let currentSpot = square.dataset.square;
        let size = GameBoard.board.length;
        let row;
        for (let i = 1; i <= size; i++){
            if (currentSpot < size*i){
                row = i-1;
                break;
            }
        }
        GameBoard.board[row][currentSpot-size*row] = "1";
        DisplayController.writeToBoard(player, currentSpot);
        player1Move = !player1Move;
    }
})();

const Player = (name, sign) =>{
    const getName = () => console.log("Hi I am " + name);

    let symbol = sign;

    return{
        getName,
        symbol
    };
}

let player1 = Player('jap', 'X');
let player2 = Player('john', 'O')