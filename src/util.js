// Get a array<int> from 1 to end_num,, increment by 1
export function createArray(end_num) {
    return Array.from(Array(end_num + 1).keys()).slice(1)
}

// Return the row and col the cell belongs to given its number
export function getNumCoordinate(num) {
    return getRow(num).toString() + getCol(num).toString();
}

// Return the row the cell belongs to given its number
export function getRow(num) {
    return Math.ceil(parseInt(num) / 8)
}

// Return the col the cell belongs to given its number
export function getCol(num) {
    return ((parseInt(num) - 1) % 8 + 1);
}

// Return true if the value is inside the array
export function inside(val, arr) {
    return arr.indexOf(val) >= 0;
}

// Create empty array length N
export function createArray2(N, elements = '') {
    let arr = []
    for (let i = 0; i < N; i++) {
        arr.push(elements);
    }
    return arr
}

export function getMoves(piece, row, col) {
    let moves = []
    row = parseInt(row); col = parseInt(col);
    
    if (piece === 'rook') {
        for (let r = 1; r < row; r++) { moves.push({ row: r, col: col }); }
        for (let r = row + 1; r <= 8; r++) { moves.push({ row: r, col: col }); }
        for (let c = 1; c < col; c++) { moves.push({ row: row, col: c }); }
        for (let c = col + 1; c <= 8; c++) { moves.push({ row: row, col: c }); }
    }
    if (piece === 'bishop') {
        for (let i = 1; i <= 7; i++) {
            moves.push({ row: row - i, col: col - i })
            moves.push({ row: row - i, col: col + i })
            moves.push({ row: row + i, col: col - i })
            moves.push({ row: row + i, col: col + i })
        }
    }
    if (piece === 'knight') {
        moves.push({ row: row + 1, col: col + 2 })
        moves.push({ row: row + 1, col: col - 2 })
        moves.push({ row: row - 1, col: col + 2 })
        moves.push({ row: row - 1, col: col - 2 })
        moves.push({ row: row + 2, col: col + 1 })
        moves.push({ row: row + 2, col: col - 1 })
        moves.push({ row: row - 2, col: col + 1 })
        moves.push({ row: row - 2, col: col - 1 })
    }
    if (piece === 'pawn') {
        moves.push({row: row - 2, col: col})
        moves.push({row: row - 1, col: col})
        moves.push({row: row + 1, col: col})
        moves.push({row: row + 2, col: col})
    }
    if (piece === 'king') {
        moves.push({row: row - 1, col: col})
        moves.push({row: row + 1, col: col})
        moves.push({row: row - 1, col: col - 1})
        moves.push({row: row + 1, col: col - 1})
        moves.push({row: row - 1, col: col + 1})
        moves.push({row: row + 1, col: col + 1})
        moves.push({row: row, col: col - 1})
        moves.push({row: row, col: col + 1})
    }
    if (piece === 'queen') {
        for (let r = 1; r < row; r++) { moves.push({ row: r, col: col }); }
        for (let r = row + 1; r <= 8; r++) { moves.push({ row: r, col: col }); }
        for (let c = 1; c < col; c++) { moves.push({ row: row, col: c }); }
        for (let c = col + 1; c <= 8; c++) { moves.push({ row: row, col: c }); }
        for (let i = 1; i <= 7; i++) {
            moves.push({ row: row - i, col: col - i })
            moves.push({ row: row - i, col: col + i })
            moves.push({ row: row + i, col: col - i })
            moves.push({ row: row + i, col: col + i })
        }
    }
    return moves;
}

export function getEmptyBoard() {
    let cell_interface = {
        index: null,
        row: null,
        col: null,
        coordinate: null,
        piece: null,
        pieceColor: null,
        cellColor: null,
    }
    let board = new Array(64)
    for (let i = 0; i < 64; i++) { board[i] = { ...cell_interface } }
    board = initBoard(board)
    return board
}

export function initBoard(board) {
    let light = true

    board.forEach((cell, i) => {
        let index = i + 1
        let row = rowFromCellIndex(index)
        let col = colFromCellIndex(index)

        // cell identifier
        cell.index = index;
        cell.row = row
        cell.col = col
        cell.coordinate = rowColToCoord(row, col)
        // cell content
        cell.piece =
            row === 2 || row === 7 ? 'pawn' :
            row === 1 || row === 8 ? 
            col === 1 || col === 8 ? 'rook' :
            col === 2 || col === 7 ? 'knight' :
            col === 3 || col === 6 ? 'bishop' :
            col === 4 ? 'queen' : 'king' : 'none' 
        cell.pieceColor =
            row === 1 || row === 2 ? DARK_PIECE :
            row === 7 || row === 8 ? LIGHT_PIECE : 'none'
        // cell color
        cell.cellColor = light ? LIGHT_CELL : DARK_CELL

        light = colFromCellIndex(index) === 8 ? light : !light
    })
    return board
}
