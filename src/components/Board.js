import { useEffect, useState } from 'react';
import {
    FaChessBishop as Bishop,
    FaChessKing as King,
    FaChessKnight as Knight,
    FaChessPawn as Pawn,
    FaChessQueen as Queen,
    FaChessRook as Rook,
} from 'react-icons/fa';

import { createArray, getCol, getRow, createArray2 } from '../util';
import Cell from './Cell';

export default function Board({ handleCellClick }) {
    const [grid, setGrid] = useState(createArray2(8, createArray2(8)))
    const dark_cell = 'rgb(181, 135, 99)';
    const light_cell = 'rgb(240, 218, 181)';
    const CELL_NUMBERS = createArray(64);
    let light = true

    useEffect(function setUpBoard() {
        const newGrid = [...grid];
        for (let row = 1; row <= 8; row++) {  
            if (row === 2 || row === 7) {
                newGrid[row-1] = [...newGrid[row-1]].fill(<Pawn />)
            }
            if (row === 1 || row === 8) {
                let currRow = [...newGrid[row-1]];
                currRow[0] = <Rook/>
                currRow[1] = <Knight/>
                currRow[2] = <Bishop/>
                currRow[3] = <Queen/>
                currRow[4] = <King/>
                currRow[5] = <Bishop/>
                currRow[6] = <Knight/>
                currRow[7] = <Rook/>
                newGrid[row-1] = currRow;
            }
        }
        setGrid(newGrid)
    }, [])

    return (
        <div className='board_container'>
            {CELL_NUMBERS.map((cell_number) => {
                // See if it's a dark or light cell
                light = (cell_number - 1) % 8 === 0 ? light : !light
                return <Cell
                    key={cell_number}
                    content={grid[getRow(cell_number)-1][getCol(cell_number)-1]}
                    cellNumber={cell_number}
                    color={light ? light_cell : dark_cell}
                    handleCellClick={handleCellClick}
                />
            })}
        </div>
    )
}
