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
export function rowColToIndex(row, col) { return (parseInt(row) - 1) * 8 + parseInt(col) - 1}



// CELL UTILTITY
export function addCellClass(row, col, className) {
    let element = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if (element) element.classList.add(className)
}
export function removeCellClass(row, col, className) {
    let element = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if (element) element.classList.remove(className)
}
export function addCellsClass(cells, className) {
    cells.forEach(cell => { addCellClass(cell.row, cell.col, className) })
}
export function removeCellsClass(cells, className) {
    cells.forEach(cell => { removeCellClass(cell.row, cell.col, className) })
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

// OTHERS
export function getSessionID() {
    return sessionStorage.getItem('chess_session_id')
}