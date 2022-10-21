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
