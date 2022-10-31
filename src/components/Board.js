import { useState } from 'react';
import { getEmptyBoard } from '../util';
import Cell from './Cell';

export default function Board() {
    const [boardArray, setBoardArray] = useState(getEmptyBoard())

    return (
        <div className='board_container'>
            {boardArray.map((cell, i) => {
                return <Cell
                    key={i}
                    index={cell.index}
                    row={cell.row}
                    col={cell.col}
                    coordinate={cell.coordinate}
                    piece={cell.piece}
                    pieceColor={cell.pieceColor}
                    cellColor={cell.cellColor}
                />
            })}
        </div>
    )
}
