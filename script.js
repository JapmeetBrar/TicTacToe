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

    const announceResult = (player, draw) =>{
        let div = document.querySelector('.outcome');
        (draw)? div.textContent = "THE GAME WAS A DRAW!":div.textContent = "THE WINNER IS: " + player.name;
    }
    return {writeToBoard, announceResult};
})();

const mainGame = (function(){
    let squares = document.querySelectorAll('.block');
    let player1Move = true;
    let playingGame = true;

    const startGame = () =>{
        playingGame = true;
        squares.forEach((square)=>{
            square.addEventListener('click', ()=>{
                (player1Move && playingGame)?_playMove(player1, square):_playMove(player2, square)
            })
        })        
    }

    const _playMove = (player, square) => {
        if (square.textContent !== "" || playingGame === false) return;
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
        _checkWin(player);
        player1Move = !player1Move;
    }

    const _checkWin = (player) => {
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
                DisplayController.announceResult(player, false);
                _stopGame();
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
            DisplayController.announceResult(player, true);
            _stopGame();
        }
    }

    const _stopGame = () =>{
        playingGame = false;
    }



    return {startGame}
})();

const Player = (name, sign) =>{
    let symbol = sign;

    return{
        name,
        symbol
    };
}

let player1 = Player('jap', 'X');
let player2 = Player('john', 'O')

mainGame.startGame();