let player1;
let player2;

const GameBoard = (function() {
    let board = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
    
    return {
        board
    };
})();

const DisplayController = (function(){

    
    const writeToBoard = (player, position) => {
        let square = document.querySelector(`[data-square = "${position}"]`);
        let playerColor = (player.symbol === "X")? "blue": "red";
        square.style.color = playerColor;
        square.textContent = player.symbol;
    }

    const announceResult = (player, draw) =>{
        let playerColor = (player.symbol === "X")? "blue": "red";
        let div = document.querySelector('.outcome');
        div.innerHTML = (draw)? "THE GAME WAS A DRAW!":`THE WINNER IS: <span class="${playerColor}">${player.name.toUpperCase()}</span>`;
    }
    return {writeToBoard, announceResult};
})();

const mainGame = (function(){


    let squares = document.querySelectorAll('.block');
    let startbtn = document.querySelector('.submit-btn');
    let popUp = document.querySelector('.popUpWindow');


    let player1Move = true;
    let playingGame = true;

    const settupGame = () =>{
        popUp.style.display = "flex";
        let p1name = document.querySelector('p1-name-input')
        let p1symbol = document.querySelector('p1-symbol-input')
        let p2name = document.querySelector('p2-name-input')
        let p2symbol = document.querySelector('p2-symbol-input')

        startbtn.addEventListener('click', ()=>{
            player1 = Player(p1name, p1symbol);
            player2 = Player(p2name, p2symbol);
            startGame(player1, player2);
            popUp.style.display = "none";
        })

    }

    const startGame = (player1, player2) =>{
        playingGame = true;
        console.log('START')
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
        //CHECKING ROWS, COLUMNS, & DIAGONALS
            // Does this by adding up values of gameboard array in all rows, columns, and diagonals
            // value of 1 in array means 'X' is played at that index/square, value of -1 means 'O'
            // value of 0 means nothing has been played in that index/square

        let size = GameBoard.board.length;
        let sumdiagleft = 0;
        let sumdiagright = 0;
        for (let i = 0; i<size; i++){
            let sumrow = 0;
            let sumcolumn = 0;
             
            sumdiagright += parseInt(GameBoard.board[i][i]);
            sumdiagleft += parseInt(GameBoard.board[i][size-i-1]);
            for (let j=0; j<size; j++){
                sumrow += parseInt(GameBoard.board[i][j]);
                sumcolumn += parseInt(GameBoard.board[j][i]);
            }

            // if sum of any row column or diagonal === size of board, it means that many 'X's or 'O's
            // have been lined up
            if (Math.abs(sumrow) === size || Math.abs(sumcolumn) === size ||
                Math.abs(sumdiagleft) === size || Math.abs(sumdiagright) === size){

                DisplayController.announceResult(player, false);
                _stopGame();
                return;
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



    return {startGame, settupGame}
})();

const Player = (name, sign) =>{
    let symbol = sign;

    return{
        name,
        symbol
    };
}



mainGame.settupGame();