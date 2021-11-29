const GameBoard = (function() {
    let board = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
    
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
        if (player1Move){
            GameBoard.board[row][currentSpot-size*row] = "1";
        } else{
            GameBoard.board[row][currentSpot-size*row] = "-1";
        }
        
        DisplayController.writeToBoard(player, currentSpot);
        _checkWin();
        player1Move = !player1Move;
    }

    const _checkWin = () => {
        //CHECKING ROWS & COLUMNS
        
        let size = GameBoard.board.length;
        for (let i = 0; i<size; i++){
            let sumrow = 0;
            let sumcolumn = 0;
            for (let j=0; j<size; j++){
                sumrow += parseInt(GameBoard.board[i][j]);
                sumcolumn += parseInt(GameBoard.board[j][i]);
            }
            if (Math.abs(sumrow) === size || Math.abs(sumcolumn) === size){
                console.log("WINNER");
                return;
            }
        }

        //CHECKING DIAGONALS
        for (let i=0; i<size; i++){
            for (let j=0; j<size; j++){
                
            }
        }


        //CHECKING DRAW
        let draw = true;
        for (let i = 0; i<size; i++){
            if (GameBoard.board[i].includes('0')){
                draw = false;
            }
        }
        if (draw === true){
            console.log("DRAW");
        }
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