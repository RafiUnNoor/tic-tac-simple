const cellElement = document.querySelectorAll(".box");
const bord = document.querySelector("#board");

const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
const winMsg = document.querySelector("#winningMassage");
const restartButton =document.querySelector("#restartButton");
const winText = document.querySelector("#winningText");
let isPlayer_O_Turn = false ;

 startGame()
 restartButton.addEventListener('click', startGame );
 function startGame(){
    isPlayer_O_Turn = false ;
    cellElement.forEach(cell=> {
        cell.classList.remove(PLAYER_X_CLASS);
        cell.classList.remove(PLAYER_O_CLASS);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click' , handleCellClick , {once:true})
    })
    setBoardHoverClass()
    winMsg.classList.remove('show')
 }

 function handleCellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}

function endGame(draw){
    if(draw){
        winText.innerText = "The game is drawn!"
    }else{
        winText.innerText =`Player ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
    winMsg.classList.add("show")
}

function isDraw() {
	return [...cellElement].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass)
}

function swapTurns() {
	isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
	bord.classList.remove(PLAYER_X_CLASS)
	bord.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		bord.classList.add(PLAYER_O_CLASS)
	} else {
		bord.classList.add(PLAYER_X_CLASS)
	}
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElement[index].classList.contains(currentClass)
		})
	})
}

