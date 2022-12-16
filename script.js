// Declaration des lignes du plateau
let l1 = ['', '', ''];
let l2 = ['', '', ''];
let l3 = ['', '', ''];

// Declaration du plateau
let board = [l1, l2, l3];

// Initialisation du turn et de figure
let turn = 0
let figure = ''
let count = 0

//Declaration des reference HTML
const displayTurn = document.querySelector('.turn')
const displayWinner = document.querySelector('.winner')
const buttonReset = document.querySelector('.reset')

let cellDivs = document.querySelectorAll('.cell-board');
buttonReset.addEventListener('click', resetBoard)

for (let cellDiv of cellDivs) {
    let dataCell = cellDiv.dataset.cell;
    cellDiv.addEventListener('click', jeu.bind(null, dataCell, cellDiv));
}
