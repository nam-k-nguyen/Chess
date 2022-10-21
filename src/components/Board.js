import { useEffect, useState } from 'react';
import { createArray, getCol, getRow, createArray2 } from '../util';
import Cell from './Cell';

export default function Board({ appHandleCellClick }) {
    const [grid, setGrid] = useState(createArray2(8, createArray2(8)))
    const dark_cell = 'rgb(181, 135, 99)';
    const light_cell = 'rgb(240, 218, 181)';
    const CELL_NUMBERS = createArray(64);
    let light = true

    useEffect(function setUpBoard() {
        const newGrid = [...grid];
        for (let row = 1; row <= 8; row++) {  
            if (row === 2 || row === 7) {
                newGrid[row-1] = [...newGrid[row-1]].fill('pawn')
            }
            if (row === 1 || row === 8) {
                let currRow = [...newGrid[row-1]];
                currRow[0] = 'rook'
                currRow[1] = 'knight'
                currRow[2] = 'bishop'
                currRow[3] = 'queen'
                currRow[4] = 'king'
                currRow[5] = 'bishop'
                currRow[6] = 'knight'
                currRow[7] = 'rook'
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
                    handleCellClick={appHandleCellClick}
                />
            })}
        </div>
    )
}
