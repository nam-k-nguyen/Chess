import { renderPiece } from '../util';

export default function Cell({
  index, row, col, coordinate, piece, pieceColor, cellColor, handleCellClick
}) {

  

  return (
    <div className='cell_container'>
      <div
        className='cell'
        onClick={handleCellClick}
        style={{ background: cellColor, color: pieceColor }}
        data-piece={piece}
        data-piece-color={pieceColor}
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
