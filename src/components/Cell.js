import {
  FaChessBishop as Bishop,
  FaChessKing as King,
  FaChessKnight as Knight,
  FaChessPawn as Pawn,
  FaChessQueen as Queen,
  FaChessRook as Rook,
} from 'react-icons/fa';
import { getMoves } from '../util';
import { useSocket } from '../context/SocketContext';

export default function Cell({ index, row, col, coordinate, piece, pieceColor, cellColor }) {
  const { socket } = useSocket()

  function renderPiece(piece) {
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

  function handleCellClick(e) {
    let cell = e.currentTarget;
    let row = cell.dataset.row
    let col = cell.dataset.col

    getMoves(cell.dataset.piece, row, col).forEach(move => { toggleCell(move.row, move.col, 'move_cell') })
    if (cell.dataset.piece !== 'none') toggleCell(row, col, 'active_cell')
  }

  function toggleCell(row, col, className) {
    let el = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
    if (el) el.classList.toggle(className)
  }

  return (
    <div className='cell_container'>
      <div
        className='cell'
        onClick={handleCellClick}
        style={{ background: cellColor, color: pieceColor }}
        data-piece={piece}
        data-index={index}
        data-row={row}
        data-col={col}
        date-coordinate={coordinate}
      >
        {renderPiece(piece)}
      </div>
    </div>
  )
}
