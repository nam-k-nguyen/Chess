import {
  FaChessBishop as Bishop,
  FaChessKing as King,
  FaChessKnight as Knight,
  FaChessPawn as Pawn,
  FaChessQueen as Queen,
  FaChessRook as Rook,
} from 'react-icons/fa';
import { getRow, getCol } from '../util';

export default function Cell({ content, cellNumber, color, handleCellClick }) {
  let display = ''
  switch (content) {
    case 'bishop': display = <Bishop />; break;
    case 'king': display = <King />; break;
    case 'knight': display = <Knight />; break;
    case 'pawn': display = <Pawn />; break;
    case 'queen': display = <Queen />; break;
    case 'rook': display = <Rook />; break;
    default: display = ''; break;
  }

  const handleCellClick = (e) => {
    let cell = e.currentTarget;
    let row = cell.dataset.cell_row
    let col = cell.dataset.cell_col
    getMoves(cell.dataset.content, row, col).forEach(move => {
      toggleCell(move.row, move.col, 'move_cell')
    })
    if (cell.dataset.content !== '') toggleCell(row, col, 'active_cell')
    socket.emit('cell_click', cell.dataset.cell_number, (response) => {
      console.log(`The server said that we clicked cell ${response}`)
    })
  }

  const toggleCell = (row, col, className) => {
    Array
      .from(document.querySelectorAll(`[data-cell_row="${row}"][data-cell_col="${col}"]`))
      .forEach(el => el.classList.toggle(className))
  }

  return (
    <div className='cell_container'>
        <div 
            className='cell' 
            style={{background: color}} 
            onClick={handleCellClick}
            data-cell_number={cellNumber}
            data-cell_row={getRow(cellNumber)}
            data-cell_col={getCol(cellNumber)}
        >
          {display}
        </div>
    </div>
  )
}
