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

// Fonction qui boucle sur les cases
function quiboucle(callback) {
    let k = 0
    for (let l in board) {
        for (let m in board[l]) {
            callback(k, l, m)
            k++
        }
    }
}

// Affichage du plateau
const boardDisplay = () => {
    quiboucle(function (k, l, m) {
        cellDivs[k].textContent = board[l][m];
    })

};

// Fonction principale du jeu
function jeu(dataCell, cellDiv) {

    if (cellDiv.textContent === "") {
        if (turn % 2) {
            displayTurn.textContent = 'Au tour de Joueur O';
        } else {
            displayTurn.textContent = 'Au tour de Joueur X';
        }

        turn++

        joueur(dataCell)
        boardDisplay()
        testWin(figure)
    }
}

// Fonction pose de la Figure sur la case voulue
function joueur(dataCell) {
    let l = Math.floor(dataCell / 3)
    let pos = dataCell % 3
    board[l].splice(pos, 1, figChoice())
    console.log(l, pos)
}

// Fonction d'alternance entre chaque Figure
function figChoice() {
    (turn % 2) ? figure = 'O' : figure = 'X'
    return figure
}

// Fonction Test Win
function testWin(figure) {
    const winningLines = [
        [l1[0], l1[1], l1[2]], [l1[0], l2[0], l3[0]],
        [l1[0], l2[1], l3[2]], [l1[1], l2[1], l3[1]],
        [l1[2], l2[2], l3[2]], [l1[2], l2[1], l3[0]],
        [l2[0], l2[1], l2[2]], [l3[0], l3[1], l3[2]]
    ];
    const indexes = [
        [0, 1, 2], [0, 3, 6],
        [0, 4, 8], [1, 4, 7],
        [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [6, 7, 8]
    ];
    for (let line in winningLines) {
        count = 0
        if (winningLines[line][0] === figure && winningLines[line][1] === figure && winningLines[line][2] === figure) {
            displayWinner.textContent = `Joueur ${figure} à gagné`
            displayTurn.textContent = 'Fin de partie'
            console.log(indexes[line])
            cellDivs[indexes[line][0]].style.backgroundColor = 'lightgreen'
            cellDivs[indexes[line][1]].style.backgroundColor = 'lightgreen'
            cellDivs[indexes[line][2]].style.backgroundColor = 'lightgreen'

            quiboucle(function (k, l, m) {
                if (cellDivs[k].textContent === '') {
                    cellDivs[k].textContent = '/'
                    cellDivs[k].style.backgroundColor = 'lightgrey'
                }
            })
        } else {
            quiboucle(function (k, l, m) {
                if (cellDivs[k].textContent !== '/' && cellDivs[k].textContent !== '') {
                    count++
                }
                if (count === 9) {
                    console.log('match nul')
                    displayWinner.textContent = 'Match NUL'
                    displayTurn.textContent = 'Fin de partie'
                }
            })
        }
    }
}