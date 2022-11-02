
import { getMoves, renderPiece, toggleCellClass } from '../util';

export default function Cell({ index, row, col, coordinate, piece, pieceColor, cellColor }) {

  function handleCellClick(e) {
    let cell = e.currentTarget;
    let row = cell.dataset.row
    let col = cell.dataset.col

    getMoves(cell.dataset.piece, row, col).forEach(move => {
      toggleCellClass(move.row, move.col, 'move_cell')
    })
    if (cell.dataset.piece !== 'none') {
      toggleCellClass(row, col, 'active_cell')
    }
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
