import {
    FaChessBishop as Bishop,
    FaChessKing as King,
    FaChessKnight as Knight,
    FaChessPawn as Pawn,
    FaChessQueen as Queen,
    FaChessRook as Rook,
} from 'react-icons/fa';



// CELL IDENTIFIER CONVERTER
export function rowColToCoord(row, col) {
    let row_coord = 9 - row
    let col_coord = String.fromCharCode(96 + col)
    return row_coord + col_coord;
}
export function coordToRowCol(coord) {
    let row = 9 - parseInt(coord[0])
    let col = coord.charCodeAt(1) - 96
    return { row: row, col: col }
}
export function rowFromCellIndex(num) { return Math.ceil(parseInt(num) / 8) }
export function colFromCellIndex(num) { return (parseInt(num) - 1) % 8 + 1 }



// CELL UTILTITY
export function toggleCellClass(row, col, className) {
    let el = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if (el) el.classList.toggle(className)
}
export function renderPiece(piece) {
    let display = ''
    switch (piece) {
        case 'bishop': display = <Bishop />; break;
        case 'king': display = <King />; break;
        case 'knight': display = <Knight />; break;
        case 'pawn': display = <Pawn />; break;
        case 'queen': display = <Queen />; break;
        case 'rook': display = <Rook />; break;
        default: display = ''; break;
    }
    return display
}



// GET POSSIBLE MOVES
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
        moves.push({ row: row - 2, col: col })
        moves.push({ row: row - 1, col: col })
        moves.push({ row: row + 1, col: col })
        moves.push({ row: row + 2, col: col })
    }
    if (piece === 'king') {
        moves.push({ row: row - 1, col: col })
        moves.push({ row: row + 1, col: col })
        moves.push({ row: row - 1, col: col - 1 })
        moves.push({ row: row + 1, col: col - 1 })
        moves.push({ row: row - 1, col: col + 1 })
        moves.push({ row: row + 1, col: col + 1 })
        moves.push({ row: row, col: col - 1 })
        moves.push({ row: row, col: col + 1 })
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
