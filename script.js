let player1;
let player2;
const GameBoard = (function() {
    let board = [];
    return {
        board
    };
})();

const DisplayController = (function(){
    const writeToBoard = (player, position) => {
        let square = document.querySelector(`[data-square = "${position}"]`);
        let playerColor = (player.priority)? "blue": "red";
        square.style.color = playerColor;
        square.textContent = player.symbol;
    }

    const announceResult = (player, draw) =>{
        let playerColor = (player.priority)? "blue": "red";
        let div = document.querySelector('.outcome');
        div.innerHTML = (draw)? "THE GAME WAS A DRAW!":`THE WINNER IS: <span class="${playerColor}">${player.name.toUpperCase()}</span>`;
    }
    return {writeToBoard, announceResult};
})();

const mainGame = (function(){


    let squares = document.querySelectorAll('.block');
    let startbtn = document.querySelector('.submit-btn');
    let restartbtn = document.querySelector('.restart');
    let popUp = document.querySelector('.popUpWindow');
    let player1Move = true;
    let playingGame = true;

    restartbtn.addEventListener('click', ()=>{
        let div = document.querySelector('.outcome');
        GameBoard.board = [];
        squares.forEach((square)=>{
            square.textContent = "";
        })
        div.textContent = "";
        player1 = null;
        player2 = null;
        player1Move = true;
        for (let i = 0; i<3; i++){
            let tempArray = [];
            for (let j = 0; j<3; j++){
                tempArray.push('0');
            }
            GameBoard.board.push(tempArray);
        }
        settupGame();
    })

    const settupGame = () =>{
        popUp.style.display = "flex";
        let p1name = document.querySelector('.p1-name-input')
        let p1symbol = document.querySelector('.p1-symbol-input')
        let p2name = document.querySelector('.p2-name-input')
        let p2symbol = document.querySelector('.p2-symbol-input')
        let p1symbolerror = document.querySelector('.error-p1-symbol')
        let p2symbolerror = document.querySelector('.error-p2-symbol')


        startbtn.addEventListener('click', ()=>{
            if (p1symbol.value.length === 1 && p2symbol.value.length === 1 && 
                p1name.value.length >=1 && p2name.value.length >=1 ) {

                let size = document.querySelector('.size').value;
                let playArea = document.querySelector('.play-area');
                playArea.style.gridTemplateColumns = `repeat(${size}, ${60/size}vmin)`;
                playArea.style.gridTemplateRows = `repeat(${size}, ${60/size}vmin)`;
                let counter = 0;
                GameBoard.board = [];
                while (playArea.firstChild) {
                    playArea.removeChild(playArea.firstChild);
                }

                for (let i = 1; i<=size; i++){
                    let tempArray = [];
                    for (let j = 1; j<=size; j++){
                        tempArray.push('0');
                        let div = document.createElement('div')
                        div.setAttribute('data-square', counter)
                        counter++;
                        div.id = `block-${counter}`;
                        div.classList.add('block');
                        div.style.fontSize = `${60/size}vmin`;
                        if (i == 1){
                            div.classList.add('top');
                        } else if (i == size){
                            div.classList.add('bottom');
                        }
                        if (j == 1){
                            div.classList.add('left');
                        }else if (j == size){
                            div.classList.add('right');
                        }
                        playArea.appendChild(div);
                    }
                    GameBoard.board.push(tempArray);
                }
                p1symbolerror.textContent = "";
                p2symbolerror.textContent = "";
                player1 = Player(p1name.value, p1symbol.value, true);
                player2 = Player(p2name.value, p2symbol.value, false);
                startGame(player1, player2);
                console.log({player1, player2})
                popUp.style.display = "none";
            }else if (p1name.value.length == 0){
                p1name.placeholder = "Enter a Name";
            }else if (p1symbol.value.length !== 1){
                p1symbolerror.textContent = "ONE CHARACTER ONLY";
            }else if (p2name.value.length == 0){
                p2name.placeholder = "jjEnter a Name";
            }
            else if (p2symbol.value.length !== 1){
                p2symbolerror.textContent = "ONE CHARACTER ONLY";
            }
        })

    }

    const startGame = (player1, player2) =>{
        playingGame = true;
        squares = document.querySelectorAll('.block');
        squares.forEach((square)=>{
            square.addEventListener('click', ()=>{
                if (player1Move && playingGame){
                    _playMove(player1, square);
                } else if (player1Move === false && playingGame){
                    _playMove(player2, square);
                }
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



    return {startGame, settupGame, player1Move, playingGame}
})();

const Player = (name, sign, priority) =>{
    let symbol = sign;
    return{
        name,
        symbol,
        priority
    };
}



mainGame.settupGame();